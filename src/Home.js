import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Home = ({ setRoomCode }) => {
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

  // to later be implemented to allow for multiple game rooms
  const generateRoomCode = () => {
    let randomRoomCode = '';
    const hexArray = '123456789ABCDEF'.split('');
    for (let i = 0; i < 6; i++) {
      const randomIdx = Math.floor(Math.random() * hexArray.length);
      randomRoomCode += hexArray[randomIdx];
    }
    setRoomCode(randomRoomCode);
  };

  return (
    <main className="wrapper">
      <div className="btnContainer">
        <Link className="button" to="/lobby" onClick={generateRoomCode}>
          Play Now
        </Link>
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
