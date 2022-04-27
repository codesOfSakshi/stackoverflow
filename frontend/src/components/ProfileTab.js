import React from 'react';
import UserStats from '../components/UserStats.js';
import UserBadgeInfo from '../components/UserBadgeInfo.js';
import UserTagList from '../components/UserTagList.js';


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