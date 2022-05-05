import { Card, Col, Row, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
// import "./atom.css";
// import "../styles/compactUser.css";

function CompactUser(props) {
  let img = props.profilePic
    ? props.profilePic
    : `https://www.gravatar.com/avatar/4e0c20b401183f5646ae297c943f5da4?s=96&amp;d=identicon&amp;r=PG&amp;f=1`;
  let reputation = props.reputation ? props.reputation : 100;

  let location = props.location ? props.location : "San Jose, CA";
  return (
    <>
      <div className="s-user-card s-user-card__full">
        <a href="…" className="s-avatar s-avatar__48 s-user-card--avatar">
          <img className="s-avatar--image" src={img} />
        </a>
        <div className="s-user-card--info">
          <a href="#" className="s-user-card--link d-flex g4">
            <div className="flex--item">Somil Jain</div>
          </a>
          <ul className="s-user-card--awards">
            <li className="s-user-card--rep">{reputation}</li>
          </ul>
          <div className="s-user-card--location">{location}</div>
        </div>
      </div>
    </>
  );
}

export default CompactUser;
