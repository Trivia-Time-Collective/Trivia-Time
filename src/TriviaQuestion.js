import { useState, useEffect } from 'react';

const TriviaQuestion = ({ currentQuestionObj, checkAnswer, setAnswer }) => {
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState([]);
  const [countdownTimer, setCountdownTimer] = useState(30);

  useEffect(() => {
    let timer;
    if (countdownTimer > 0) {
      timer = setTimeout(() => setCountdownTimer(countdownTimer - 1), 1000);
      console.log('Timer ID: ', timer);
      console.log(countdownTimer);
    } else if (countdownTimer === 0) {
      console.log('Timer cleared');
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdownTimer]);

  // loads new set of questions on new round, or when page loads
  useEffect(() => {
    // randomize function here
    function randomChoices(choices) {
      const outputArray = choices;
      for (let i = outputArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // using destructuring, swap array positions.
        [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
      }
      return outputArray;
    }
    const RandomizedArray = randomChoices([...currentQuestionObj.incorrect_answers, currentQuestionObj.correct_answer]);

    setQuestion(currentQuestionObj.question);
    setChoices(RandomizedArray);
    setAnswer(currentQuestionObj.correct_answer);
    setCountdownTimer(30);

    return () => {
      console.log('trivia question unmounted');
    };
  }, [currentQuestionObj.correct_answer, currentQuestionObj.incorrect_answers, currentQuestionObj.question, setAnswer]);

  return (
    <div className="triviaQuestion">
      <h3
        dangerouslySetInnerHTML={{
          __html: question,
        }}
      ></h3>
      <div className="triviaChoiceContainer">
        {choices.map((choice, index) => {
          return <button key={index} className="triviaChoice" onClick={() => checkAnswer(choice)} dangerouslySetInnerHTML={{ __html: choice }}></button>;
        })}
      </div>
    </div>
  );
};

export default TriviaQuestion;
