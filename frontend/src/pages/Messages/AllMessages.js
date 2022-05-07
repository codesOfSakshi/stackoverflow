
import React, { Component, Fragment } from 'react';
import Talk from "talkjs";
import jwt_decode from 'jwt-decode';
import { LinearProgress } from '@mui/material';
import './Messaging.css'

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

                <br/><br/><br/><br/><br/><br/>
                <h1 style={{position:'absolute', top:90, right:700}}>My Messages</h1>
                <br/><br/>
                <div style={{height: '500px'}} className="inbox-container" ref={c => this.container = c}>
                    <LinearProgress/>
                </div>
            </Fragment>
        );
    }
  }
  
  export default AllMessages;