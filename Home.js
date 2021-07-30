import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className='wrapper'>
      <Link to='/lobby'>Start Game</Link>
    </main>
  );
};

export default Home;
