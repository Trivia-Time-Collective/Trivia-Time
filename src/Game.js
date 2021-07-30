import axios from 'axios';
import { useEffect, useState } from 'react';

const Game = () => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [roundCounter, setRoundCounter] = useState(0);

  const checkAnswer = (buttonValue) => {
    console.log(buttonValue);
    if (roundCounter < 9) {
      setRoundCounter(roundCounter +1)
    }
  } 



  useEffect(() => {
    axios({
      url: `https://opentdb.com/api.php`,
      method: 'GET',
      dataResponse: 'json',
      params: {
        amount: 10,
        category: 18,
        difficulty: 'easy',
        type: 'multiple',
      },
    }).then((res) => {
      // const arrayFromServer = res.data.results;
      console.log(res.data.results);
      setQuestionsArray(res.data.results);
      setChoices([...res.data.results[0].incorrect_answers, res.data.results[0].correct_answer]);
      setAnswer(res.data.results[0].correct_answer);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setChoices([...questionsArray[roundCounter].incorrect_answers, questionsArray[roundCounter].correct_answer]);
      setAnswer(questionsArray[roundCounter].correct_answer);
    }
  }, [roundCounter, isLoaded])

  return !isLoaded?(
    <div>
      <h2>Loading...</h2>
    </div>
  ):(
    <div>
      <h3>{questionsArray[roundCounter].question}</h3>
      {choices.map( (choice, index) => {
        return (
          <div key={index}>
          <button onClick={() => checkAnswer(index)}>
            {choice}
          </button>
          </div>
        )
      })}
    </div>
  );
};

export default Game;
