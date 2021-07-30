import axios from "axios";
import { useEffect, useState } from "react";

const Lobby = () => {

  const [avatar, setAvatar] = useState("");

  useEffect(() => {

    axios({
      url:'https://avatars.dicebear.com/api/bottts/munira.svg',
      method:'GET',
      dataResponse: 'json'

    }).then((res) => {
      setAvatar(res.data)
      console.log(res);
    })

  },[]) 

  return (
    <div>
      <h2>Lobby</h2>
      <div className="avatar">
        <img src="https://avatars.dicebear.com/api/male/example.svg" />
      </div>
    </div>
  );
};

export default Lobby;
