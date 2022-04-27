import React from 'react';
import UserTag from './UserTag.js';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/usertaglist.css";

const UserTagList = () => {
  return (
    <div>
        <div>
            <div className="usertaglist-count">621 Tags</div>
            <div className="usertaglist-tab">
                <Nav variant="tabs" defaultActiveKey="/score">
                    <Nav.Item>
                        <Nav.Link eventKey="/score">Score</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/name">Name</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
        <div>
            <UserTag></UserTag>
        </div>
    </div>
  )
}

export default UserTagList