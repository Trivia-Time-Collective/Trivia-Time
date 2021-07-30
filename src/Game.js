import axios from 'axios';
import { useEffect, useState } from 'react';

const Game = () => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState([]);

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
    });
  }, []);
  return (
    <div>
      <h2>Gameplay:</h2>
      <p>{choices}</p>
      <p>{answer}</p>
    </div>
  );
};

export default Game;
