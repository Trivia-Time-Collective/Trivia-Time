import { Link } from 'react-router-dom';

const GameSummary = ({ listOfUsers }) => {
  return (
    <div className="summaryWrapper">
      <h2>Game Summary:</h2>
      <div className="playerContainer">
        {listOfUsers.map((userObj) => {
          return (
            <div className="userProfile">
              <p className="userPoints">Points: {userObj.points}</p>
              <img className="userProfileAvatar" src={userObj.avatarImg} alt={userObj.username} />
              <p className="userProfileName">{userObj.username}</p>
            </div>
          );
        })}
      </div>
      <div className="summaryPageLinks">
        {/* // all scores 
            // announce the winner
            // button for play again? and another for main */}
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/lobby" className="button">
          Play Again
        </Link>
        <Link to="/leaderboard" className="button">
          Leaderboard
        </Link>
      </div>
    </div>
  );
};
export default GameSummary;
