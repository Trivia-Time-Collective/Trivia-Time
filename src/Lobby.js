import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import firebase from './firebaseConfig.js';

import User from './User.js';
import TriviaOptionsForm from './TriviaOptionsForm';

const Lobby = ({ listOfUsers, roomCode, isOnlineMultiplayer }) => {
  const [showAddUserField, setShowAddUserField] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [userRef, setUserRef] = useState('');

  const roomRef = firebase.database().ref(`sessions/${roomCode}`);

  const removeUser = (userKeyToDelete) => {
    roomRef.child(userKeyToDelete).remove();
  };

  const resetUserField = () => {
    setUsernameInput('');
    setShowAddUserField(true);
  };

  const addOrUpdateUser = (e) => {
    e.preventDefault();
    if (isOnlineMultiplayer) {
      updateUser();
    } else {
      addUser(e);
    }
  };

  // For Online Multiplayer. Function to update user by their given Firebase userRef.
  const updateUser = () => {
    userRef.update({
      username: usernameInput,
    });
    setShowAddUserField(false);
  };

  // For Local Hot Seat. Function to add multiple users in one browser.
  // Check if username is already taken and input is not empty, then push user to Firebase
  const addUser = () => {
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

  // Online Multiplayer: On page load, Set a user object on Firebase with a default username.
  useEffect(() => {
    // Create A template user for Online Multiplayer version
    if (isOnlineMultiplayer) {
      const newUser = {};
      newUser.username = 'TriviaBuff';
      newUser.points = 0;
      newUser.avatarImg = `https://robohash.org/TriviaBuff`;
      newUser.isTurnComplete = false;
      const newUserRef = firebase.database().ref(`sessions/${roomCode}`).push(newUser);
      setUserRef(newUserRef);
    }
  }, [isOnlineMultiplayer, roomCode]);

  return (
    <main className="wrapper lobbyContainer">
      <Link to="/" className="quit button">
        Home
      </Link>
      {isOnlineMultiplayer ? <h2>Room #{roomCode}</h2> : <h2>Local Hot Seat</h2>}
      {showAddUserField ? (
        <form className="addUserForm" onSubmit={addOrUpdateUser}>
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
      ) : (
        <div className="addUserForm">
          {/* Retrieve username by filtering from listOfUsers */}
          <h3>Welcome, {listOfUsers.filter((user) => user.key === userRef.key)[0]?.username}</h3>
          <button className="turquoiseButton" onClick={resetUserField}>
            Reset
          </button>
        </div>
      )}
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
      {/* <div className="linkContainer">
        <Link to={`/game`} onClick={loadTriviaQuestions} className="formButton">
          Start Game
        </Link>
      </div> */}
    </main>
  );
};

export default Lobby;
