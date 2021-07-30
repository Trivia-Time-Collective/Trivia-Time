import './App.scss';

import Lobby from './Lobby';
import Game from './Game';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <header>
        <h1>Trivia Time</h1>
      </header>
      <Route
        exact
        path='/'
        render={() => {
          return (
            <main>
              <Link to='/lobby'>Start Game</Link>
            </main>
          );
        }}
      />

      <Route path='/lobby' component={Lobby} />
      <Route path='/game' component={Game} />

      <footer>
        <p>Created at Juno College with Munira, Denzel, Andrew and Gavyn.</p>
      </footer>
    </Router>
  );
}

export default App;
