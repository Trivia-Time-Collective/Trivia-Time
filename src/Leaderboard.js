import firebase from './firebaseConfig.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categoryLookupObject = {
  9: 'General Knowledge',
  10: 'Entertainment: Books',
  11: 'Entertainment: Film',
  12: 'Entertainment: Music',
  13: 'Entertainment: Musicals &amp; Theatres',
  14: 'Entertainment: Television',
  15: 'Entertainment: Video Games',
  16: 'Entertainment: Board Games',
  17: 'Science &amp; Nature',
  18: 'Science: Computers',
  19: 'Science: Mathematics',
  20: 'Mythology',
  21: 'Sports',
  22: 'Geography',
  23: 'History',
  24: 'Politics',
  25: 'Art',
  26: 'Celebrities',
  27: 'Animals',
  28: 'Vehicles',
  29: 'Entertainment: Comics',
  30: 'Science: Gadgets',
  31: 'Entertainment: Japanese Anime &amp; Manga',
  32: 'Entertainment: Cartoon &amp; Animations',
};

const Leaderboard = () => {
  const [leaderboardList, setLeaderboardList] = useState([]);

  useEffect(() => {
    const leaderboardRef = firebase.database().ref('leaderboard');
    leaderboardRef.on('value', (snapshot) => {
      const leaderboardData = snapshot.val();
      const newArray = [];
      for (const key in leaderboardData) {
        const userObj = {
          key: key,
          username: leaderboardData[key].username,
          points: leaderboardData[key].points,
          difficulty: leaderboardData[key].difficulty,
          category: categoryLookupObject[leaderboardData[key].category],
        };
        newArray.push(userObj);
      }
      newArray.sort((a, b) => b.points - a.points);
      setLeaderboardList(newArray);
    });
  }, []);

  return (
    <main className="wrapper leaderboardMain">
      <h2>leaderboard</h2>
      <Link to="/" className="quit button">
        Home
      </Link>
      <ul>
        {leaderboardList.map((leaderboardObj) => {
          return (
            <li key={leaderboardObj.key}>
              <h3 className="leaderboardName">{leaderboardObj.username}</h3>
              <p className="leaderboardPoints">{leaderboardObj.points} Points</p>
              <h4>Category</h4>
              <p>{leaderboardObj.category}</p>
              <h4>Difficulty</h4>
              <p>{leaderboardObj.difficulty}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Leaderboard;
