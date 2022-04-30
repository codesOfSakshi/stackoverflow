import React from 'react';
import {Nav} from 'react-bootstrap';
import UserReputationHistory from './UserReputationHistory.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/reputationlist.css";

const UserReputationList = () => {
  return (
      <div>
        <div className="usertaglist-count">56,145 Reputation</div>
        <div className="usertaglist-tab">
            <Nav variant="tabs" defaultActiveKey="/score">
                <Nav.Item>
                    <Nav.Link eventKey="/score">Post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/time">Time</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/graph">Graph</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
        <UserReputationHistory/>
      </div>
  )
}

export default UserReputationList