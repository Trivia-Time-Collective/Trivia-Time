import './App.scss';

import Lobby from './Lobby';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <header>
        <h1>Trivia Time</h1>
      </header>
      <main>
        <Link to='/lobby'>Start Game</Link>
        <Route path='/lobby' component={Lobby} />
      </main>

      <footer>
        <p>Created at Juno College with Munira, Denzel, Andrew and Gavyn.</p>
      </footer>
    </Router> 
  );
}

export default App;
