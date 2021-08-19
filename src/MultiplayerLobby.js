import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import firebase from './firebaseConfig.js';

import MultiplayerUser from './MultiplayerUser.js';
import TriviaOptionsForm from './TriviaOptionsForm';

const Lobby = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [showAddUserField, setShowAddUserField] = useState(true);
  const [usernameInput, setUsernameInput] = useState('');
  const [userRef, setUserRef] = useState('');
  const location = useLocation();
  const { roomCode } = useParams();
  console.log(roomCode);
  console.log(location);

  const resetUserField = () => {
    setUsernameInput('');
    setShowAddUserField(true);
  };

  // For Online Multiplayer. Function to update user by their given Firebase userRef.
  const updateUser = (e) => {
    e.preventDefault();
    userRef.update({
      username: usernameInput,
    });
    setShowAddUserField(false);
  };

  const playerReady = () => {
    userRef.update({
      isReady: true,
    });
  };

  // Access Firebase to update userList regularly
  useEffect(() => {
    if (roomCode !== '') {
      const dbRef = firebase.database().ref(`sessions/${roomCode}`);

      dbRef.on('value', (snapshot) => {
        const myData = snapshot.val();
        const newArray = [];
        for (let objKey in myData) {
          const userObj = {
            key: objKey,
            username: myData[objKey].username,
            points: myData[objKey].points,
            avatarImg: myData[objKey].avatarImg,
            isTurnComplete: myData[objKey].isTurnComplete,
            isReady: myData[objKey].isReady,
          };
          newArray.push(userObj);
        }
        setListOfUsers(newArray);
      });
    }
  }, [roomCode]);

  // On page load, Set a user object on Firebase with a default username.
  useEffect(() => {
    // Create new user object
    const newUser = {};
    newUser.username = 'TriviaBuff';
    newUser.points = 0;
    newUser.avatarImg = `https://robohash.org/TriviaBuff`;
    newUser.isTurnComplete = false;
    newUser.isReady = false;
    newUser.isHost = location.state.isHost;

    // Add user to Firebase session
    const newUserRef = firebase.database().ref(`sessions/${roomCode}`).push(newUser);
    // Create an onDisconnect handler
    newUserRef.onDisconnect().remove();
    setUserRef(newUserRef);
  }, [location.state.isHost, roomCode]);

  return (
    <main className="wrapper lobbyContainer">
      <Link to="/" className="quit button">
        Home
      </Link>
      <h2>Room #{roomCode}</h2>
      {showAddUserField ? (
        <form className="addUserForm" onSubmit={updateUser}>
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
            return <MultiplayerUser userObj={userObj} key={index} />;
          })}
        </ul>
      </div>
      <button className="turquoiseButton" onClick={playerReady}>
        Ready Up
      </button>
      <div className="optionsTitleContainer">
        <div className="optionsTitleBorder"></div>
        <h3>Select your Trivia Options</h3>
        <div className="optionsTitleBorder"></div>
      </div>
      <TriviaOptionsForm listOfUsers={listOfUsers} roomCode={roomCode} />
    </main>
  );
};

export default Lobby;
