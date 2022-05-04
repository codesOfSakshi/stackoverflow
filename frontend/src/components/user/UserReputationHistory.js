import React from 'react';
import "../../styles/reputation.css";

const UserReputationHistory = ({eachReputationHistory}) => {
  return (
    <div className="reputation-container">
        {eachReputationHistory.action.gain && <div className="reputation-points-gain">+{eachReputationHistory.action.points}</div>}
        {!eachReputationHistory.action.gain && <div className="reputation-points-loss">-{eachReputationHistory.action.points}</div>}
        <div className="reputation-info">{eachReputationHistory.action.description}</div>
    </div>
  )
}

export default UserReputationHistory