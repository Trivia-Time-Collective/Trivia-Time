import './scss/styles.scss';
import firebase from './firebaseConfig.js';

import Home from './Home';
import Lobby from './Lobby';
import Game from './Game';
import GameSummary from './GameSummary';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const roomCode = 'ABC123';

  // Access Firebase to update userList regularly
  useEffect(() => {
    const dbRef = firebase.database().ref(`sessions/${roomCode}`);

    dbRef.on('value', (snapshot) => {
      const myData = snapshot.val();
      console.log(myData);
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
  }, []);

  return (
    <Router>
      <header className="wrapper">
        <h1>Trivia Time</h1>
      </header>

      <main className="wrapper">
        <Route exact path="/" component={Home} />
        <Route path="/lobby" render={() => <Lobby listOfUsers={listOfUsers} setListOfUsers={setListOfUsers} roomCode={roomCode} />} />
        <Route path="/game/:category/:difficulty/:questionType" render={() => <Game listOfUsers={listOfUsers} />} />
        <Route path="/gamesummary" render={() => <GameSummary listOfUsers={listOfUsers} />} />
      </main>

      <footer>
        <p>
          Created at <a href="https://junocollege.com/">Juno College</a> by Munira, Denzel, Andrew and Gavyn.
        </p>
      </footer>
    </Router>
  );
}

export default App;
