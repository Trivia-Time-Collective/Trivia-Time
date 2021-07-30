import './App.scss';

import Home from './Home';
import Lobby from './Lobby';
import Game from './Game';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  return (
    <Router>
      <header className='wrapper'>
        <h1>Trivia Time</h1>
      </header>

      <Route exact path='/' component={Home} />
      <Route path='/lobby' render={() => <Lobby listOfUsers={listOfUsers} setListOfUsers={setListOfUsers} />} />
      <Route path='/game' render={() => <Game listOfUsers={listOfUsers} />} />

      <footer>
        <p>
          Created at <a href='https://junocollege.com/'>Juno College</a> by Munira, Denzel, Andrew and Gavyn.
        </p>
      </footer>
    </Router>
  );
}

export default App;
