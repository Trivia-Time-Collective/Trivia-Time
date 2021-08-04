import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import firebase from './firebaseConfig.js';

const Game = ({ listOfUsers, roomCode, questionsArray }) => {
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [roundCounter, setRoundCounter] = useState(0);
  const [turnCounter, setTurnCounter] = useState(0);
  const [score, setScore] = useState(0);

  const history = useHistory();
  // Get Firebase reference to points value for current user
  const currentUserRef = firebase.database().ref(`sessions/${roomCode}/${listOfUsers[turnCounter].key}`);

  const checkAnswer = async (buttonValue) => {
    if (buttonValue === answer) {
      const pointsSnapshot = await currentUserRef.child('points').get();
      const updatedPoints = pointsSnapshot.val() + 1;
      currentUserRef.update({ points: updatedPoints });
      setScore(updatedPoints);
    }
    if (roundCounter < 9) {
      setRoundCounter(roundCounter + 1);
    } else {
      // get a new snapshot in case final question was answered correctly
      const pointsSnapshot = await currentUserRef.child('points').get();
      await swal('Round Complete!', `Your score was ${pointsSnapshot.val()}.`);
      setRoundCounter(0);
      setScore(0);
      if (turnCounter < listOfUsers.length - 1) {
        setTurnCounter(turnCounter + 1);
      } else {
        // redirects Router to GameSummary.js
        history.push('/gamesummary');
      }
    }
  };

  // loads new set of questions on new round, or when page loads
  useEffect(() => {
    setChoices([...questionsArray[roundCounter].incorrect_answers, questionsArray[roundCounter].correct_answer]);
    setAnswer(questionsArray[roundCounter].correct_answer);
  }, [roundCounter, questionsArray]);

  // On page load, loops through all users to ensure that points are at 0 (since users now persist on Firebase)
  useEffect(() => {
    for (let { key } of listOfUsers) {
      const userRef = firebase.database().ref(`sessions/${roomCode}/${key}`);
      userRef.update({ points: 0 });
    }
    console.log('user scores reset');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="wrapper gamePage">
      <div className="currentUser">
        <p>{`${listOfUsers[turnCounter].username}'s turn`}</p>
        <p>Score: {score}</p>
      </div>
      <h3
        dangerouslySetInnerHTML={{
          __html: questionsArray[roundCounter].question,
        }}
      ></h3>
      <div className="triviaChoiceContainer">
        {choices.map((choice, index) => {
          return <button key={index} className="triviaChoice" onClick={() => checkAnswer(choice)} dangerouslySetInnerHTML={{ __html: choice }}></button>;
        })}
      </div>
    </main>
  );
};

export default Game;
