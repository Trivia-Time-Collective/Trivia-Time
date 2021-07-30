import './App.scss';

import Home from './Home';
import Lobby from './Lobby';
import Game from './Game';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <header className='wrapper'>
        <h1>Trivia Time</h1>
      </header>

      <Route exact path='/' component={Home} />
      <Route path='/lobby' component={Lobby} />
      <Route path='/game' component={Game} />

      <footer>
        <p>
          Created at <a href='https://junocollege.com/'>Juno College</a> by Munira, Denzel, Andrew and Gavyn.
        </p>
      </footer>
    </Router>
  );
}

export default App;
