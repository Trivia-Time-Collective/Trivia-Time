import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';

const Home = ({ setRoomCode }) => {
  const [joinRoomCode, setJoinRoomCode] = useState('');
  const history = useHistory();

  // Sweet Alert Modal to show game instructions
  const showInstructions = () => {
    swal({
      icon: 'info',
      text: `
      - Click Play Now
      - Enter a user name and choose an avatar
      - Choose a category, difficulty and question type
      - Answer all questions within the time limit 
      - When your turn is complete pass the phone to /n
       the next player  on your team
      - Impress all your friends with your trivia knowledge!`,
    });
  };

  // Generates a new 4-digit room code for Host Game Option
  const generateRoomCode = () => {
    let randomRoomCode = '';
    const hexArray = '123456789ABCDEF'.split('');
    for (let i = 0; i < 4; i++) {
      const randomIdx = Math.floor(Math.random() * hexArray.length);
      randomRoomCode += hexArray[randomIdx];
    }
    setRoomCode(randomRoomCode);
  };

  const joinRoom = () => {
    setRoomCode(joinRoomCode);
    history.push('/lobby');
  };

  return (
    <main className="wrapper">
      <div className="btnContainer">
        <Link className="button" to="/lobby" onClick={generateRoomCode}>
          Host Game
        </Link>
        <form onSubmit={joinRoom}>
          <label htmlFor="joinRoomInput"></label>
          <input
            type="text"
            id="joinRoomInput"
            placeholder="Enter Room Code"
            value={joinRoomCode}
            onChange={(e) => setJoinRoomCode(e.target.value.toUpperCase())}
          />
          <button className="button" type="submit">
            Join Room
          </button>
        </form>
        <button className="button" onClick={showInstructions}>
          Instructions
        </button>
        <Link className="button" to="/leaderboard">
          Leaderboard
        </Link>
      </div>
    </main>
  );
};

export default Home;
