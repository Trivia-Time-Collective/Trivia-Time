import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';

const Home = ({ setRoomCode }) => {
  const [joinRoomCode, setJoinRoomCode] = useState('');
  const history = useHistory();

  const hexArray = '123456789ABCDEF'.split('');

  // Sweet Alert Modal to show game instructions
  const showInstructions = () => {
    swal({
      icon: 'info',
      title: 'How to play:',
      text: `
      • Host a game and invite your friends
      • Or enter a custom game code and join room
      • Enter a username
      • Choose a category, difficulty and question type
      • Answer all questions within the time limit 
      • When your turn is complete pass the phone to
       the next player  on your team
      • Impress all your friends with your trivia knowledge!`,
    });
  };

  // Generates a new 4-digit room code for Host Game Option
  const generateRoomCode = () => {
    let randomRoomCode = '';
    for (let i = 0; i < 4; i++) {
      const randomIdx = Math.floor(Math.random() * hexArray.length);
      randomRoomCode += hexArray[randomIdx];
    }
    setRoomCode(randomRoomCode);
  };

  // Remove any whitespace from roomcode, then check for invalid characters and ensure length is exactly 4
  const joinRoom = (e) => {
    e.preventDefault();
    // trim whitespace
    const processedRoomCode = joinRoomCode.trim();
    let isValidRoomCode = true;
    // check for invalid characters (not 1-9 or A-F)
    for (const char of joinRoomCode) {
      if (!hexArray.includes(char)) {
        isValidRoomCode = false;
        break;
      }
    }
    if (processedRoomCode !== '' && isValidRoomCode && processedRoomCode.length === 4) {
      setRoomCode(processedRoomCode);
      history.push('/lobby');
    } else {
      swal('Error', 'Please enter a 4-digit room code with numbers 1-9, letters A-F only.', 'warning');
    }
  };

  return (
    <main className="wrapper">
      <div className="btnContainer">
        <Link className="button" to="/lobby" onClick={generateRoomCode}>
          Host Game
        </Link>
        <form className="roomCodeForm" onSubmit={joinRoom}>
          <label className="sr-only" htmlFor="joinRoomInput">
            Enter 4-digit Room Code:
          </label>
          <input
            type="text"
            className="joinRoomInput"
            id="joinRoomInput"
            placeholder='eg. "AB12"'
            maxLength={4}
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
