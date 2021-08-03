import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { count } from 'yargs';

const Game = ({ listOfUsers }) => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [roundCounter, setRoundCounter] = useState(0);
  const [turnCounter, setTurnCounter] = useState(0);
  const [score, setScore] = useState(0);

  const [countdown, setCountdown] = useState(30);

  const history = useHistory();

  const { category, difficulty, questionType } = useParams();
  console.log(category, difficulty, questionType);

  const checkAnswer = (buttonValue) => {
    console.log(buttonValue);
    if (buttonValue === answer) {
      listOfUsers[turnCounter].points += 1;
      setScore(listOfUsers[turnCounter].points);
    }
    if (roundCounter < 9) {
      setRoundCounter(roundCounter + 1);
      setCountdown(30);
    } else {
      swal('Round Complete!', `Your score was ${listOfUsers[turnCounter].points}.`);
      setRoundCounter(0);
      setScore(0);
      setCountdown(30);
      if (turnCounter < listOfUsers.length - 1) {
        setTurnCounter(turnCounter + 1);
      } else {
        history.push('/gamesummary');
      }
    }
    
    // if (countdown > 0) {
    //   setTimeout(() => setCountdown(countdown - 1), 1000);
    // } else {
    //   setCountdown('Time Over!');
    // }
  };

  useEffect(() => {
    axios({
      url: `https://opentdb.com/api.php`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        amount: 10,
        category: category,
        difficulty: difficulty,
        type: questionType,
      },
    }).then((res) => {
      setQuestionsArray(res.data.results);
      console.log(res.data.results);
      setIsLoaded(true);
    });
  }, [category, difficulty, questionType]);

  useEffect(() => {
    if (isLoaded) {
      setChoices([
        ...questionsArray[roundCounter].incorrect_answers,
        questionsArray[roundCounter].correct_answer,
      ]);
      setAnswer(questionsArray[roundCounter].correct_answer);
    }
  }, [roundCounter, isLoaded, questionsArray]);

  useEffect(() => {

    setTimeout (() => setCountdown(countdown - 1), 1000);
    if (countdown === 0)
      {
        checkAnswer('hello')
      }
  }, [countdown]);

  return !isLoaded ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : (
    <div>
      <p>{`${listOfUsers[turnCounter].username}'s turn`}</p>
      <p>Score: {score}</p>
      <div>
        Time Left: {countdown}
      </div>
      <h3
        dangerouslySetInnerHTML={{
          __html: questionsArray[roundCounter].question,
        }}
      ></h3>
      {choices.map((choice, index) => {
        return (
          <div key={index}>
            <button
              onClick={() => checkAnswer(choice)}
              dangerouslySetInnerHTML={{ __html: choice }}
            ></button>
          </div>
        );
      })}
    </div>
  );

};

export default Game;
