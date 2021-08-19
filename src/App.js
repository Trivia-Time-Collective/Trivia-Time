import './scss/styles.scss';

import Home from './Home';
import HotSeatLobby from './HotSeatLobby';
import MultiplayerLobby from './MultiplayerLobby';
import Game from './Game';
import GameSummary from './GameSummary';
import Leaderboard from './Leaderboard';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isOnlineMultiplayer, setIsOnlineMultiplayer] = useState(false);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <header className="wrapper">
        <h1>Trivia Time</h1>
      </header>

      <Route exact path="/" render={() => <Home setIsOnlineMultiplayer={setIsOnlineMultiplayer} />} />
      {isOnlineMultiplayer ? <Route path="/:roomCode/lobby" component={MultiplayerLobby} /> : <Route path="/lobby" component={HotSeatLobby} />}
      <Route path=":roomCode/game" component={Game} />
      <Route path="/gamesummary" component={GameSummary} />
      <Route path="/leaderboard" component={Leaderboard} />

      <footer>
        <p>
          Created at <a href="https://junocollege.com/">Juno College</a> by Munira, Denzel, Andrew and Gavyn.
        </p>
      </footer>
    </Router>
  );
}

export default App;
