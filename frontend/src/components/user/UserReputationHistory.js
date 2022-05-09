import React from 'react';
import "../../styles/reputation.css";

const UserReputationHistory = ({eachReputationHistory}) => {
  return (
    <div className="reputation-container">
        {eachReputationHistory.gain>0 && <div className="reputation-points-gain">+{eachReputationHistory.gain}</div>}
        {eachReputationHistory.gain<0 && <div className="reputation-points-loss">-{eachReputationHistory.gain}</div>}
        <div className="reputation-info">{eachReputationHistory.action}</div>
    </div>
  )
}

export default UserReputationHistory