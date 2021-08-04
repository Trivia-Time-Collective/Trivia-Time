import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

const User = ({ userObj, index, removeUser }) => {
  const handleKeyDown = (e) => {
    if (e.key.toLowerCase() === 'delete') {
      removeUser(userObj.key);
    }
  };

  return (
    <li className="userProfile">
      <div>
        <p className="userProfileName">{userObj.username}</p>
        <FontAwesomeIcon
          tabIndex="0"
          className="removeUser"
          icon={faWindowClose}
          onKeyDown={handleKeyDown}
          onClick={() => removeUser(userObj.key)}
          aria-label={`Remove User: ${userObj.username}`}
        />
      </div>
      <div className="imageContainer">
        <img src={userObj.avatarImg} alt={`Avatar for ${userObj.username}`} />
      </div>
    </li>
  );
};

export default User;
