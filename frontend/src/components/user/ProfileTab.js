import React from 'react';
import UserStats from './UserStats.js';
import UserBadgeInfo from './UserBadgeInfo.js';
import UserTagList from './UserTagList.js';


const ProfileTab = () => {
  return (
      <>
        <div>ProfileTab</div>
        <UserStats/>
        <UserBadgeInfo/>
        <UserTagList/>
      </>
  )
}

export default ProfileTab