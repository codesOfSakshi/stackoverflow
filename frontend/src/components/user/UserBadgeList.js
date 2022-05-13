import React, {useEffect, useState} from 'react';

import {useParams} from "react-router-dom";
import UserBadge from "./UserBadge";
import {axiosInstance as authapi} from '../../services/authaxiosservice';


const UserBadgeList = () => {
  const [badges, setBadges] = useState([]);

  const GET_USER_API = "api/tags/badges/";
  const params = useParams();
  console.log(params)
  const { userId: userId } = params;
  console.log(userId)
  const getUser = async () => {

    try{
      const response = await authapi.get(GET_USER_API+userId);
      console.log(response)
      if(response && response.data){
        console.log(response.data.tags[0][0])
        if(response.data.tags) {
          setBadges(response.data.tags);
          console.log(badges)
        }
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
  },[]);

console.log(badges)
  return (
      <UserBadge/>
  )
}

export default UserBadgeList;