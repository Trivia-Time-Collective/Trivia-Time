import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    axios({
      url: 'https://avatars.dicebear.com/api/bottts/test.svg',
      method: 'GET',
      dataResponse: 'json',
    }).then((res) => {
      setAvatar(res.data);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <h2>Lobby</h2>
      <div dangerouslySetInnerHTML={{ __html: avatar }} />

      <Link to='/game'>Game Page</Link>
    </div>
  );
};

export default Lobby;
