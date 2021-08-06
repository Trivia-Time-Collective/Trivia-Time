import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import firebase from './firebaseConfig.js';
import TriviaQuestion from './TriviaQuestion.js';

const Game = ({ listOfUsers, roomCode, questionsArray }) => {
  const [roundCounter, setRoundCounter] = useState(0);
  const [turnCounter, setTurnCounter] = useState(0);
  const [answer, setAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [showTimer, setShowTimer] = useState(true);

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
      // hide timer while awaiting user Modal click
      setShowTimer(false);
      // determine next player
      const nextPlayer = listOfUsers[turnCounter + 1] !== undefined ? listOfUsers[turnCounter + 1].username : '';
      await swal({
        title: 'Round Complete!',
        text: `Your score was ${pointsSnapshot.val()}. ${nextPlayer ? `\nPass the game to the next player: ${nextPlayer}` : ''}`,
        className: 'swal-centered',
      });
      setRoundCounter(0);
      setScore(0);
      setShowTimer(true);
      if (turnCounter < listOfUsers.length - 1) {
        setTurnCounter(turnCounter + 1);
      } else {
        // redirects Router to GameSummary.js
        history.push('/gamesummary');
      }
    }
  };

  // On page load, loops through all users to ensure that points are at 0 (since users now persist on Firebase)
  useEffect(() => {
    for (const { key } of listOfUsers) {
      const userRef = firebase.database().ref(`sessions/${roomCode}/${key}`);
      userRef.update({ points: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="wrapper gamePage">
      <Link to="/lobby" className="quit button">
        Quit
      </Link>
      <div className="currentUser">
        <p>{`${listOfUsers[turnCounter].username}'s turn`}</p>
        <p>Score: {score}</p>
      </div>
      <TriviaQuestion currentQuestionObj={questionsArray[roundCounter]} setAnswer={setAnswer} checkAnswer={checkAnswer} showTimer={showTimer} />
    </main>
  );
};

export default Game;
