import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/usertag.css";

const UserTag = () => {
  return (
    <div className="usertag-container">
        <div className="usertag-title">python</div>
        <div className="usertag-gold-type"></div>
        <div className="usertag-score">3290 score</div>
        <div className="usertag-posts">2886 posts</div>
    </div>
  )
}

export default UserTag