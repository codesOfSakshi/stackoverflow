import { Card, Col, Row, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./atom.css";
// import "../styles/compactUser.css";

function CompactUser({ name, profilePic, reputation, location, _id }) {
  profilePic =
    profilePic != null
      ? profilePic
      : `https://www.gravatar.com/avatar/4e0c20b401183f5646ae297c943f5da4?s=96&amp;d=identicon&amp;r=PG&amp;f=1`;
  reputation = reputation != null ? reputation : 100;
  name = name != null ? name : "Default name";
  location = location != null ? location : "San Jose, CA";
  const USERURL = `/user/${_id}`;

  return (
    <>
      <Link to={USERURL}></Link>
      <div className="s-user-card s-user-card__full">
        <Link
          to="/signin"
          className="s-avatar s-avatar__48 s-user-card--avatar"
        >
          <img className="s-avatar--image" src={profilePic} />
        </Link>
        <div className="s-user-card--info">
          <Link to={USERURL} className="s-user-card--link d-flex g4">
            <div className="flex--item">{name}</div>
          </Link>
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
