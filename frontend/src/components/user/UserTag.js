import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/usertag.css";
import jwt_decode from 'jwt-decode';

const UserTag = ({profileTab,activityTab,name,color,score,posts}) => {
  
  const token = localStorage.getItem("token");
  const decoded = token?(jwt_decode(token.split('.')[1], { header: true })):false
  const userId = decoded._id;

  return (
    <div className="usertag-container">
        {profileTab===true && <div className="usertag-title"><a href={"/tag/"+name}>{name}</a></div>}
        {activityTab===true && <div className="usertag-title"><a href={"/usertag/"+userId+"/"+name}>{name}</a></div>}
        {color==="gold" && <div className="usertag-gold-type"></div>}
        {color==="silver" && <div className="usertag-silver-type"></div>}
        {color==="bronze" && <div className="usertag-bronze-type"></div>}
        {!color && <div className="usertag-no-type"></div>}
        <div className="usertag-score">{score+" score"}</div>
        <div className="usertag-posts">{posts+" posts"}</div>
    </div>
  )
}

export default UserTag