import './scss/styles.scss';
import firebase from './firebaseConfig.js';

import Home from './Home';
import HotSeatLobby from './HotSeatLobby';
import MultiplayerLobby from './MultiplayerLobby';
import Game from './Game';
import GameSummary from './GameSummary';
import Leaderboard from './Leaderboard';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [roomCode, setRoomCode] = useState('');
  const [isOnlineMultiplayer, setIsOnlineMultiplayer] = useState(false);

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
          };
          newArray.push(userObj);
        }
        setListOfUsers(newArray);
      });
    }
  }, [roomCode]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <header className="wrapper">
        <h1>Trivia Time</h1>
      </header>

      <Route exact path="/" render={() => <Home setRoomCode={setRoomCode} setIsOnlineMultiplayer={setIsOnlineMultiplayer} />} />
      <Route
        path="/lobby"
        render={() =>
          isOnlineMultiplayer ? (
            <MultiplayerLobby listOfUsers={listOfUsers} roomCode={roomCode} />
          ) : (
            <HotSeatLobby listOfUsers={listOfUsers} roomCode={roomCode} />
          )
        }
      />
      <Route path="/game" render={() => <Game listOfUsers={listOfUsers} roomCode={roomCode} />} />
      <Route path="/gamesummary" render={() => <GameSummary listOfUsers={listOfUsers} roomCode={roomCode} />} />
      <Route path="/leaderboard" render={() => <Leaderboard />} />

      <footer>
        <p>
          Created at <a href="https://junocollege.com/">Juno College</a> by Munira, Denzel, Andrew and Gavyn.
        </p>
      </footer>
    </Router>
  );
}

export default App;
