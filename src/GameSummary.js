import { Link } from 'react-router-dom';
import firebase from './firebaseConfig.js';
import {useEffect, useState} from 'react';

const GameSummary = ({ listOfUsers }) => {

  const [isAddedToFB, setIsAddedToFB] = useState(false);

  useEffect(() => {
    if (!isAddedToFB) {

    const leaderboardRef = firebase.database().ref('leaderboard');
    for (const userObj of listOfUsers) {
      leaderboardRef.push({
        username: userObj.username,
        points: userObj.points
      })
    }
    setIsAddedToFB(true)
  }
  }, [])


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
    </main>
  );
};
export default GameSummary;
