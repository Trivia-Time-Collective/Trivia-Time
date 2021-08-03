import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="wrapper">
      <div className="btnContainer">
        <Link className="button" to="/lobby">
          Play Now
        </Link>
        <Link className="button" to="/instructions">
          Instructions
        </Link>
        <Link className="button" to="/leaderboard">
          Leaderboard
        </Link>
      </div>
    </main>
  );
};

export default Home;
