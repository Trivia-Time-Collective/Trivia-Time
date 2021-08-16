import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const MultiplayerUser = ({ userObj }) => {
  return (
    <li className="userProfile">
      {userObj.isReady === true ? (
        <div className="userReady">
          <FontAwesomeIcon icon={faCheckSquare} />
        </div>
      ) : null}
      <p className="userProfileName">{userObj.username}</p>
      <div className="imageContainer">
        <img src={userObj.avatarImg} alt={`Avatar for ${userObj.username}`} />
      </div>
    </li>
  );
};

export default MultiplayerUser;
