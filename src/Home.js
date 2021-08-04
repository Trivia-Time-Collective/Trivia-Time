import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Home = () => {

  const showInstructions = () => {
    swal ({
      icon: 'info',
      text:`
      - Click Play Now
      - Enter a user name and choose an avatar
      - Choose a category, difficulty and question type
      - Answer all questions within the time limit 
      - When your turn is complete pass the phone to /n
       the next player  on your team
      - Impress all your friends with your trivia knowledge!`
    })
  }

  return (
    <main className="wrapper">
      <div className="btnContainer">
        <Link className="button" to="/lobby">
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
