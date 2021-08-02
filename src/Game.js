import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Game = ({ listOfUsers }) => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [roundCounter, setRoundCounter] = useState(0);
  const [score, setScore] = useState(0);

  const { category, difficulty, questionType } = useParams();
  console.log(category, difficulty, questionType);

  const checkAnswer = (buttonValue) => {
    console.log(buttonValue);
    if (buttonValue === answer) {
      setScore(score + 1);
    }
    if (roundCounter < 9) {
      setRoundCounter(roundCounter + 1);
    } else {
      // end game
    }
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
      setIsLoaded(true);
    });
  }, [category, difficulty, questionType]);

  useEffect(() => {
    if (isLoaded) {
      setChoices([...questionsArray[roundCounter].incorrect_answers, questionsArray[roundCounter].correct_answer]);
      setAnswer(questionsArray[roundCounter].correct_answer);
    }
  }, [roundCounter, isLoaded, questionsArray]);

  return !isLoaded ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : (
    <div>
      <p>Score: {score}</p>
      <h3 dangerouslySetInnerHTML={{ __html: questionsArray[roundCounter].question }}></h3>
      {choices.map((choice, index) => {
        return (
          <div key={index}>
            <button onClick={() => checkAnswer(choice)} dangerouslySetInnerHTML={{ __html: choice }}></button>
          </div>
        );
      })}
    </div>
  );
};

export default Game;
