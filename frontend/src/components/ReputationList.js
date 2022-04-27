import React from 'react';
import {Nav} from 'react-bootstrap';
import Reputation from './Reputation.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/reputationlist.css";

const ReputationList = () => {
  return (
      <div>
        <div className="usertaglist-count">56,145 Reputation</div>
        <div className="usertaglist-tab">
            <Nav variant="tabs" defaultActiveKey="/score">
                <Nav.Item>
                    <Nav.Link href="/score">Post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/time">Time</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/graph">Graph</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
        <Reputation/>
      </div>
  )
}

export default ReputationList