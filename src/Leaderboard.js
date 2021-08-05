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
      setLeaderboardList(newArray);
      console.log(leaderboardList);
    });
  }, []);

  return (
    <main className="leaderboardMain">
      <h2 className="leaderboardh2">leaderboard!</h2>
      <ul className="leaderboardUl">
        {leaderboardList.map((leaderboardObj) => {
          return (
            <li className="leaderboardLi" key={leaderboardObj.key}>
              <p className="leaderboardName">Name: {leaderboardObj.username}</p>
              <p className="leaderboardPoints">Points: {leaderboardObj.points}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Leaderboard;
