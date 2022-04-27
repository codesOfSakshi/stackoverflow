import React from 'react';
import '../styles/stats.css';

const UserStats = () => {

  return (
      <div className="stats-container">
          <div className="stats-item-reputation-container">
                <div className="stats-item-value">100</div>
                <div className="stats-item-heading">reputation</div>
          </div>
          <div className="stats-item-reached-container">
                <div className="stats-item-value">10</div>
                <div className="stats-item-heading">reached</div>
          </div>
          <div className="stats-item-answers-container">
                <div className="stats-item-value">10</div>
                <div className="stats-item-heading">answers</div>
          </div>
          <div className="stats-item-questions-container">
                <div className="stats-item-value">10</div>
                <div className="stats-item-heading">questions</div>
          </div>
      </div>
  )
}

export default UserStats