import React from 'react';
import "../../styles/reputation.css";

const UserReputationHistory = ({eachReputationHistory}) => {
  return (
    <div className="reputation-container">
        {eachReputationHistory.gain>0 && <div className="reputation-points-gain">+{eachReputationHistory.gain}</div>}
        {eachReputationHistory.gain<0 && <div className="reputation-points-loss">{eachReputationHistory.gain}</div>}
        {eachReputationHistory.action==="UPVOTE_QUESTION" && <div className="reputation-info">UPVOTE QUESTION</div>}
        {eachReputationHistory.action==="DOWNVOTE_QUESTION" && <div className="reputation-info">DOWNVOTE QUESTION</div>}
        {eachReputationHistory.action==="UPVOTE_ANSWER" && <div className="reputation-info">UPVOTE ANSWER</div>}
        {eachReputationHistory.action==="DOWNVOTE_ANSWER" && <div className="reputation-info">DOWNVOTE ANSWER</div>}
        {eachReputationHistory.action==="BEST_ANS_MARKED" && <div className="reputation-info">BEST ANSWER MARKED</div>}
        {eachReputationHistory.action==="BEST_ANS_UNMARKED" && <div className="reputation-info">BEST ANSWER UNMARKED</div>}
    </div>
  )
}

export default UserReputationHistory