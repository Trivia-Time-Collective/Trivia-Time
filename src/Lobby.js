import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import firebase from './firebaseConfig.js';

const Lobby = ({ listOfUsers, setListOfUsers, roomCode }) => {
  const [avatar, setAvatar] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [triviaCategory, setTriviaCategory] = useState('placeholder');
  const [triviaDifficulty, setTriviaDifficulty] = useState('placeholder');
  const [triviaQuestionType, setTriviaQuestionType] = useState('placeholder');

  const userRef = firebase.database().ref(`sessions/${roomCode}`);

  const removeUser = (userKeyToDelete) => {
    userRef.child(userKeyToDelete).remove();
  };

  // Check if usename is already taken and input is not empty, then push user to Firebase
  const addUser = (e) => {
    e.preventDefault();
    const userToAdd = usernameInput.trim();
    let usernameTaken = false;
    listOfUsers.forEach((userObj) => {
      if (userObj.username === userToAdd) {
        usernameTaken = true;
      }
    });

    if (userToAdd !== '' && !usernameTaken) {
      const newUser = {};
      newUser.username = userToAdd;
      newUser.points = 0;
      newUser.avatarImg = `https://robohash.org/${newUser.username}`;
      userRef.push(newUser);
    } else if (usernameTaken) {
      swal('Whoops!', 'That username is taken.', 'warning');
    }
    setUsernameInput('');
  };

  const checkGameSettings = (e) => {
    let errorMessage = [];
    if (triviaCategory === 'placeholder') {
      errorMessage.push('trivia category');
    }
    if (triviaDifficulty === 'placeholder') {
      errorMessage.push('trivia difficulty');
    }
    if (triviaQuestionType === 'placeholder') {
      errorMessage.push('trivia question type');
    }
    if (listOfUsers.length <= 0) {
      errorMessage.push('must have at least one user');
    }

    if (errorMessage.length > 0) {
      e.preventDefault();
      swal({
        title: 'The following fields are missing:',
        text: '- ' + errorMessage.join('\n - '),
        icon: 'warning',
      });
    }
  };

  // Currently not in use
  useEffect(() => {
    axios({
      url: 'https://avatars.dicebear.com/api/bottts/test.svg',
      method: 'GET',
      dataResponse: 'json',
    }).then((res) => {
      setAvatar(res.data);
    });
  }, []);
  //-------------------- end of not in use

  return (
    <div className="lobbyWrapper">
      <form className="addUserForm" onSubmit={addUser}>
        <div className="formBox">
          <label htmlFor="username">Enter a username:</label>
          <input type="text" id="username" placeholder="Enter username" required value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} />
        </div>

        <div className="formBox">
          <label htmlFor="avatarSelect">Select an Avatar:</label>
          <select id="avatarSelect">
            <option value="1">Robot 1</option>
          </select>
        </div>
        <button type="submit" className="formButton">
          Add User
        </button>
      </form>
      {/* <div className="avatar" dangerouslySetInnerHTML={{ __html: avatar }} /> */}
      <div className="contestantsContainer">
        <ul className="userProfileList">
          {listOfUsers.map((userObj, index) => {
            return (
              <li className="userProfile" key={index}>
                <div>
                  <p className="userProfileName">{userObj.username}</p>
                  <div
                    className="removeUser"
                    // for Firebase, remove user by key
                    onClick={() => removeUser(userObj.key)}
                  >
                    Remove User
                  </div>
                </div>
                <div className="imageContainer">
                  <img src={userObj.avatarImg} alt={`Avatar for ${userObj.username}`} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <form className="triviaOptionsForm">
        <div className="formBox">
          <label htmlFor="triviaCategory">Select Category:</label>
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
            {/* Try to access API to get category list */}
          </select>
        </div>

        <div className="formRow">
          <div className="formBox">
            <label htmlFor="triviaDifficulty">Select Difficulty</label>
            <select id="triviaDifficulty" onChange={(e) => setTriviaDifficulty(e.target.value)} value={triviaDifficulty}>
              <option value="placeholder" disabled>
                Select Difficulty:
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="formBox">
            <label htmlFor="triviaQuestionType">Select Question Type:</label>
            <select id="triviaQuestionType" onChange={(e) => setTriviaQuestionType(e.target.value)} value={triviaQuestionType}>
              <option value="placeholder" disabled>
                Select Q Type:
              </option>
              <option value="boolean">True or False</option>
              <option value="multiple">Multiple Choice</option>
            </select>
          </div>
        </div>
        {/* On button press, take user choices and go to next page. */}
      </form>
      <div className="linkContainer">
        <Link to="/" className="formButton">
          Home
        </Link>
        <Link to="/gamesummary" className="formButton">
          Game Summary
        </Link>
        <Link to={`/game/${triviaCategory}/${triviaDifficulty}/${triviaQuestionType}`} onClick={checkGameSettings} className="formButton">
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default Lobby;
