import { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import firebase from './firebaseConfig.js';

import User from './User.js';
import TriviaOptionsForm from './TriviaOptionsForm';

const Lobby = ({ listOfUsers, roomCode }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const roomRef = firebase.database().ref(`sessions/${roomCode}`);

  const removeUser = (userKeyToDelete) => {
    roomRef.child(userKeyToDelete).remove();
  };

  // For Local Hot Seat. Function to add multiple users in one browser.
  // Check if username is already taken and input is not empty, then push user to Firebase
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
      roomRef.push(newUser);
    } else if (usernameTaken) {
      swal('Whoops!', 'That username is taken.', 'warning');
    }
    setUsernameInput('');
  };

  return (
    <main className="wrapper lobbyContainer">
      <Link to="/" className="quit button">
        Home
      </Link>
      <h2>Local Hot Seat</h2>
      <form className="addUserForm" onSubmit={addUser}>
        <div className="formBox">
          <label className="sr-only" htmlFor="username">
            Enter a username:
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            maxLength={12}
            required
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
        </div>
        <button type="submit" className="turquoiseButton">
          Add User
        </button>
      </form>
      <div className="contestantsContainer">
        <ul className="userProfileList">
          {listOfUsers.map((userObj, index) => {
            return <User userObj={userObj} index={index} removeUser={removeUser} key={index} />;
          })}
        </ul>
      </div>
      <div className="optionsTitleContainer">
        <div className="optionsTitleBorder"></div>
        <h3>Select your Trivia Options</h3>
        <div className="optionsTitleBorder"></div>
      </div>
      <TriviaOptionsForm listOfUsers={listOfUsers} />
    </main>
  );
};

export default Lobby;
