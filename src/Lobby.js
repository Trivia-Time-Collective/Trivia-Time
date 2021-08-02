import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Lobby = ({ listOfUsers, setListOfUsers }) => {
  const [avatar, setAvatar] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [triviaCategory, setTriviaCategory] = useState('placeholder');
  const [triviaDifficulty, setTriviaDifficulty] = useState('placeholder');
  const [triviaQuestionType, setTriviaQuestionType] = useState('placeholder');

  const addUser = (e) => {
    e.preventDefault();
    if (usernameInput.trim() !== '') {
      const newUser = {
        username: usernameInput.trim(),
      };
      setListOfUsers([...listOfUsers, newUser]);
    }
    setUsernameInput('');
  };

  useEffect(() => {
    axios({
      url: 'https://avatars.dicebear.com/api/bottts/test.svg',
      method: 'GET',
      dataResponse: 'json',
    }).then((res) => {
      setAvatar(res.data);
      // console.log(res);
    });
  }, []);

  return (
    <div>
      <h2>Lobby</h2>
      <form className='addUserForm' onSubmit={addUser}>
        <label htmlFor='username'>Enter a username:</label>
        <input type='text' id='username' placeholder='Enter username' required value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
        <label htmlFor='avatarSelect'>Select an Avatar:</label>
        <select id='avatarSelect'>
          <option value='1'>Robot 1</option>
        </select>
        <button type='submit'>Add User</button>
      </form>
      <div className='avatar' dangerouslySetInnerHTML={{ __html: avatar }} />

      <div className='contestantsContainer'>
        <ul className='contestantsList'>
          {listOfUsers.map((userObj) => {
            return (
              <li>
                <p>{userObj.username}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <form className='triviaOptionsForm'>
        <label htmlFor='triviaCategory'>Select Category:</label>
        <select id='triviaCategory' onChange={(e) => setTriviaCategory(e.target.value)} value={triviaCategory}>
          <option value='placeholder' disabled>
            Select Category:
          </option>
          <option value='9'>General Knowledge</option>
          {/* Try to access API to get category list */}
        </select>
        <label htmlFor='triviaDifficulty'>Select Difficulty</label>

        <select id='triviaDifficulty' onChange={(e) => setTriviaDifficulty(e.target.value)} value={triviaDifficulty}>
          <option value='placeholder' disabled>
            Select Difficulty:
          </option>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <label htmlFor='triviaQuestionType'>Select Question Type:</label>
        <select id='triviaQuestionType' onChange={(e) => setTriviaQuestionType(e.target.value)} value={triviaQuestionType}>
          <option value='placeholder' disabled>
            Select Q Type:
          </option>
          <option value='boolean'>True or False</option>
          <option value='multiple'>Multiple Choice</option>
        </select>
        {/* On button press, take user choices and go to next page. */}
      </form>
      <Link to={`/game/${triviaCategory}/${triviaDifficulty}/${triviaQuestionType}`}>Game Page</Link>
    </div>
  );
};

export default Lobby;
