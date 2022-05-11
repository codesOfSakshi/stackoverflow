
import React, { Component, Fragment } from 'react';
import Talk from "talkjs";
import jwt_decode from 'jwt-decode';
import { LinearProgress } from '@mui/material';
import './Messaging.css'
import { Row,Col } from 'react-bootstrap';
import Navbar from '../../components/user/Navbar';
import SideNav from '../../Atom/SideNav';

class AllMessages extends Component {

    constructor(props) {
        super(props);

        this.inbox = undefined;
        let currentUser;
        const currentTalkjsUser = localStorage.getItem("token");
        const decoded = jwt_decode(currentTalkjsUser.split('.')[1], { header: true });

        if (decoded) {
            currentUser = decoded
        }

        this.state = {
            currentUser
        }
    }

    componentDidMount() {
        Talk.ready
            .then(() => {
                const me = new Talk.User(this.state.currentUser);
                
                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tqlH9Iz5",
                        me: me
                    });
                }
            
                this.inbox = window.talkSession.createInbox();
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    render() {
        return (
            <Fragment>
                <Navbar/>
                <Row>
                <Col lg={1}>
                    <br/><br/><br/>
                <SideNav/>
                </Col>
                <Col>
                    {/* <h1 style={{position:'absolute', top:100, right:700}}>My Messages</h1> */}
                    <br/><br/><br/><br/>
                    <h1 style={{marginLeft:570}}>My Messages</h1>
                    <br/><br/>
                    <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>
                        <LinearProgress/>
                    </div>
                </Col>
                </Row>
            </Fragment>
        );
    }
  }
  
  export default AllMessages;