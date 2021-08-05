import { Link } from 'react-router-dom';
import firebase from './firebaseConfig.js';
import { useEffect, useState } from 'react';

const GameSummary = ({ listOfUsers, roomCode }) => {
  const [isAddedToFB, setIsAddedToFB] = useState(false);

  const removeRoom = () => {
    const roomRef = firebase.database().ref(`sessions/${roomCode}`);
    roomRef.remove();
  };

  useEffect(() => {
    if (!isAddedToFB) {
      const leaderboardRef = firebase.database().ref('leaderboard');
      for (const userObj of listOfUsers) {
        leaderboardRef.push({
          username: userObj.username,
          points: userObj.points,
        });
      }
      setIsAddedToFB(true);
    }
  }, [isAddedToFB, listOfUsers]);

  return (
    <main className="wrapper summaryWrapper">
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
        <Link to="/" className="button" onClick={removeRoom}>
          Home
        </Link>
        <Link to="/lobby" className="button">
          Play Again
        </Link>
        <Link to="/leaderboard" className="button" onClick={removeRoom}>
          Leaderboard
        </Link>
      </div>
    </main>
  );
};
export default GameSummary;
