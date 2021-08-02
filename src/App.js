import './scss/styles.scss';
import firebase from './firebaseConfig.js';

import Home from './Home';
import Lobby from './Lobby';
import Game from './Game';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [fBListOfUsers, setFBListOfUsers] = useState([]);
  console.log(fBListOfUsers);

  // testing out firebase. not funnctional yet
  useEffect(() => {
    const roomCode = 'ABC123';
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
        };
        newArray.push(userObj);
      }
      setFBListOfUsers(newArray);
    });
  }, []);
  //------------- end of test

  return (
    <Router>
      <header className='wrapper'>
        <h1>Trivia Time</h1>
      </header>

      <Route exact path='/' component={Home} />
      <Route path='/lobby' render={() => <Lobby listOfUsers={listOfUsers} setListOfUsers={setListOfUsers} />} />
      <Route path='/game/:category/:difficulty/:questionType' render={() => <Game listOfUsers={listOfUsers} />} />

      <footer>
        <p>
          Created at <a href='https://junocollege.com/'>Juno College</a> by Munira, Denzel, Andrew and Gavyn.
        </p>
      </footer>
    </Router>
  );
}

export default App;
