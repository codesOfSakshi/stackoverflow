import React, {useEffect, useState} from 'react'
import '../../styles/badge.css';
import {useParams} from "react-router-dom";
import {axiosInstance as authapi} from '../../services/authaxiosservice';

const UserBadge = () => {
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


  console.log(badges);
  return (
    <div className="badge-container">
        {badges.map(badge=>{
        return <div>
          <div className="badge-title">
            {badge[1] === "Gold" &&
            <div className="badge-gold-type"></div>}
            {badge[1] === "Silver" &&
                <div className="badge-silver-type"></div>}
            {badge[1] === "Bronze" &&
                <div className="badge-bronze-type"></div>}
            <div className="badge-name">{badge[0]}</div>
          </div>
         </div>
        })}
    </div>
  )
}

export default UserBadge