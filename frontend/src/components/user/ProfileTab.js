import React from 'react';
import UserStats from './UserStats.js';
import UserBadgeInfo from './UserBadgeInfo.js';
import UserTagList from './UserTagList.js';
import "../../styles/profiletab.css";


const ProfileTab = () => {
  return (
      <div className="profiletab-container">
        <UserStats className=""/>
        <UserBadgeInfo className=""/>
        <UserTagList className=""/>
      </div>
  )
}

export default ProfileTab