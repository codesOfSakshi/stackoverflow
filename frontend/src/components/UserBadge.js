import React from 'react'
import '../styles/badge.css';

const UserBadge = () => {
  return (
    <div className="badge-container">
        <div className="badge-title">
            <div className="badge-gold-type"></div>
            <div className="badge-name">dataframe</div>
        </div>
        <div className="badge-date">Mar 8</div>
    </div>
  )
}

export default UserBadge