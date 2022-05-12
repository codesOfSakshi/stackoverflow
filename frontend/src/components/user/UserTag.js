import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/usertag.css";

const UserTag = ({name,color,score,posts}) => {
  return (
    <div className="usertag-container">
        <div className="usertag-title"><a href={"/tag/"+name}>{name}</a></div>
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