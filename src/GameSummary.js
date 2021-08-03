import { Link } from 'react-router-dom';

const GameSummary = ({ listOfUsers }) => {
    return (
        <div className="summaryWrapper">
            <h2>Game Summary!</h2>
            <div className="playerContainer">
                {listOfUsers.map((userObj) => {
                    return (
                        <div className="userProfile">
                            <img className="userProfileAvatar" src={userObj.avatarImg} alt={userObj.username}/>
                            <p className="userProfileName">{userObj.username}</p>
                            <p className="userPoints">Points: {userObj.points}</p>
                        </div>
                        
                    )
                })} 
            </div>
        <div className="summaryPageLinks">         
                {/* // all scores 
            // announce the winner
            // button for play again? and another for main */}
            <Link to='/'>Home</Link>
            <Link to='/lobby'>Play Again</Link>
            <Link to='/leaderboard'>Leaderboard</Link>
        </div>
      </div>
        
    )
}
export default GameSummary;
