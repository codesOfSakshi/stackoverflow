import React,{useState, useEffect} from 'react';
import '../../styles/stats.css';

const UserStats = ({reach, reputation, answerCount, questionCount}) => {
  
  return (
        <div className="stats-container profiletab-item-stats-container">
            <div className="stats-title">Stats</div>
            <div className="stats-info-container">
            <div className="stats-item-reputation-container">
                  <div className="stats-item-value">{reputation}</div>
                  <div className="stats-item-heading">reputation</div>
            </div>
            <div className="stats-item-reached-container">
                  <div className="stats-item-value">{reach}</div>
                  <div className="stats-item-heading">reached</div>
            </div>
            <div className="stats-item-answers-container">
                  <div className="stats-item-value">{answerCount}</div>
                  <div className="stats-item-heading">answers</div>
            </div>
            <div className="stats-item-questions-container">
                  <div className="stats-item-value">{questionCount}</div>
                  <div className="stats-item-heading">questions</div>
            </div>
            </div>
        </div>
  )
}

export default UserStats