import firebase from './firebaseConfig.js';
import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboardList, setLeaderboardList] = useState([]);

  useEffect(() => {
    const leaderboardRef = firebase.database().ref('leaderboard');
    leaderboardRef.on('value', (snapshot) => {
      const leaderboardData = snapshot.val();
      console.log(leaderboardData);
      const newArray = [];
      for (const key in leaderboardData) {
        const userObj = {
          key: key,
          username: leaderboardData[key].username,
          points: leaderboardData[key].points,
        };
        newArray.push(userObj);
      }
      newArray.sort((a, b) => a.points < b.points);
      setLeaderboardList(newArray);
    });
  }, []);

  return (
    <main>
      <h2>leaderboard!</h2>
      <ul>
        {leaderboardList.map((leaderboardObj) => {
          return (
            <li key={leaderboardObj.key}>
              <p>Name: {leaderboardObj.username}</p>
              <p>Points: {leaderboardObj.points}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Leaderboard;
