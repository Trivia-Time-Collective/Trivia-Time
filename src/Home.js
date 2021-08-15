import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import swal from 'sweetalert';
import firebase from './firebaseConfig.js';

const Home = ({ setRoomCode, setIsOnlineMultiplayer }) => {
  const [joinRoomCode, setJoinRoomCode] = useState('');
  const [showPlayNowMenu, setShowPlayNowMenu] = useState(false);
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

  // Function to start a local hot seat game
  const startHotSeatGame = () => {
    setIsOnlineMultiplayer(false);
    generateRoomCode();
  };

  // Function to start hosting an online session
  const startOnlineGame = () => {
    setIsOnlineMultiplayer(true);
    generateRoomCode();
  };

  // Generates a new 4-digit room code
  const generateRoomCode = () => {
    let randomRoomCode = '';
    for (let i = 0; i < 4; i++) {
      const randomIdx = Math.floor(Math.random() * hexArray.length);
      randomRoomCode += hexArray[randomIdx];
    }
    setRoomCode(randomRoomCode);
  };

  // Remove any whitespace from roomCode, then check for invalid characters and ensure length is exactly 4
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
      const roomCodeRef = firebase.database().ref(`sessions/${processedRoomCode}`);
      roomCodeRef
        .get()
        .then((snapshot) => {
          if (snapshot.val() === null) {
            throw new Error('This room does not exist');
          }
          setRoomCode(processedRoomCode);
          setIsOnlineMultiplayer(true);
          history.push({
            pathname: '/lobby',
            state: {
              isHost: false,
            },
          });
        })
        .catch((error) => {
          swal('Room not found', error.message, 'warning');
          setJoinRoomCode('');
        });
    } else {
      swal('Error', 'Please enter a 4-digit room code with numbers 1-9, letters A-F only.', 'warning');
      setJoinRoomCode('');
    }
  };

  return showPlayNowMenu ? (
    <main className="wrapper">
      <div className="btnContainer">
        <Link className="button" to="/lobby" onClick={startHotSeatGame}>
          Local: Hot Seat
        </Link>
        <Link className="button" to={{ pathname: '/lobby', state: { isHost: true } }} onClick={startOnlineGame}>
          Online: Host Game
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
      </div>
    </main>
  ) : (
    <main className="wrapper">
      <div className="btnContainer">
        <button
          className="button"
          onClick={() => {
            setShowPlayNowMenu(true);
          }}
        >
          Play Now
        </button>

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
