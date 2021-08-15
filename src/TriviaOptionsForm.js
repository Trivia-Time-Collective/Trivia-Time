import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';
import swal from 'sweetalert';

const TriviaOptionsForm = ({ listOfUsers, roomCode }) => {
  const [triviaCategory, setTriviaCategory] = useState('placeholder');
  const [triviaDifficulty, setTriviaDifficulty] = useState('easy');
  const [triviaQuestionType, setTriviaQuestionType] = useState('multiple');
  const history = useHistory();

  // Before making axios call, check if all form categories have been completed or selected
  // if any fields in form are empty, return false, if forms are completed return true
  const checkGameSettings = (e) => {
    let errorMessage = [];
    if (triviaCategory === 'placeholder') {
      errorMessage.push('trivia category');
    }
    if (listOfUsers.length <= 0) {
      errorMessage.push('must have at least one user');
    }
    if (errorMessage.length > 0) {
      swal({
        title: 'The following fields are missing:',
        text: '- ' + errorMessage.join('\n - '),
        icon: 'warning',
      });
      return false;
    } else {
      return true;
    }
  };

  // Make an axios call to Open Trivia API. If not enough results are found, catch error and allow user to select a new category
  const loadTriviaQuestions = (e) => {
    e.preventDefault();
    const formsFilled = checkGameSettings(e);
    if (formsFilled) {
      axios({
        url: `https://opentdb.com/api.php`,
        method: 'GET',
        dataResponse: 'json',
        params: {
          amount: 10,
          category: triviaCategory,
          difficulty: triviaDifficulty,
          type: triviaQuestionType,
        },
      })
        .then((res) => {
          // error code 1 from API means: Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
          if (res.data.response_code === 1) {
            throw new Error('Not enough results for this Trivia Category. Please select something else.');
          } else {
            // since e.preventDefault has been executed, use useHistory to forward to next page
            history.push({
              pathname: `${roomCode}/game`,
              state: {
                listOfUsers: listOfUsers,
                questionsArray: res.data.results,
                triviaDifficulty: triviaDifficulty,
                triviaCategory: triviaCategory,
              },
            });
          }
        })
        .catch((error) => {
          swal({
            title: 'Error',
            text: error.message,
            icon: 'error',
            className: 'swal-centered',
          });
        });
    }
  };

  return (
    <form className="triviaOptionsForm" onSubmit={loadTriviaQuestions}>
      <div className="formBox">
        <label className="triviaLabel" htmlFor="triviaCategory">
          Category:
        </label>
        <select id="triviaCategory" onChange={(e) => setTriviaCategory(e.target.value)} value={triviaCategory}>
          <option value="placeholder" disabled>
            Select Category:
          </option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </select>
      </div>

      <div className="formRow">
        <fieldset className="formBox">
          <legend className="triviaLabel">Difficulty:</legend>
          <input
            type="radio"
            name="triviaDifficulty"
            id="easy"
            value="easy"
            checked={triviaDifficulty === 'easy'}
            onChange={(e) => setTriviaDifficulty(e.target.value)}
          />
          <label htmlFor="easy">Easy</label>

          <input
            type="radio"
            name="triviaDifficulty"
            id="medium"
            value="medium"
            checked={triviaDifficulty === 'medium'}
            onChange={(e) => setTriviaDifficulty(e.target.value)}
          />
          <label htmlFor="medium">Medium</label>

          <input
            type="radio"
            name="triviaDifficulty"
            id="hard"
            value="hard"
            checked={triviaDifficulty === 'hard'}
            onChange={(e) => setTriviaDifficulty(e.target.value)}
          />
          <label htmlFor="hard">Hard</label>
        </fieldset>
        <fieldset className="radioQuestionType">
          <legend className="triviaLabel">Question Type:</legend>
          <div className="formBox">
            <input
              type="radio"
              id="boolean"
              name="triviaQuestionType"
              value="boolean"
              checked={triviaQuestionType === 'boolean'}
              onChange={(e) => setTriviaQuestionType(e.target.value)}
            />
            <label htmlFor="boolean">True or False</label>
          </div>
          <div className="formBox">
            <input
              type="radio"
              id="multiple"
              name="triviaQuestionType"
              value="multiple"
              checked={triviaQuestionType === 'multiple'}
              onChange={(e) => setTriviaQuestionType(e.target.value)}
            />
            <label htmlFor="multiple">Multiple Choice</label>
          </div>
        </fieldset>
      </div>
      <button type="submit" className="formButton">
        Start Game
      </button>
    </form>
  );
};

export default TriviaOptionsForm;
