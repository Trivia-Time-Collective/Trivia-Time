import './App.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <header>
        <h1>Trivia Time</h1>
      </header>
      <main></main>
      <footer>
        <p>Created at Juno College with Munira, Denzel, Andrew and Gavyn.</p>
      </footer>
    </Router>
  );
}

export default App;
