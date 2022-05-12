import React , {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Talk from "talkjs";
import './Messaging.css'
import { Row,Col } from 'react-bootstrap';
import Navbar from '../../components/user/Navbar';
import SideNav from '../../Atom/SideNav';

function Messaging() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token.split('.')[1], { header: true });

    let talkjsUser;
    if(decoded){
        talkjsUser = decoded
    }

    // Searches the users by the name
    const handleSearch = (e) => {
        
        console.log("Searching for users: ", e.target.value)
    
        let search = e.target.value
        if(search.length >= 3){
            
            axios.get("http://54.183.240.252:3001/api/user/searchbyname/" + search)
            .then(response => {
                    if(response.data.data){
                        setUsers(response.data.data);
                        console.log(response.data);
                    }
                    else{
                        setUsers([])
                    }
                }) 
        }
        // When input is empty, set users to empty
        else if (search.length == 0){
            setUsers([]);
        }
    }


    // Navigates to all user's messages window
    const navigateToAllMessages = () => {
        navigate('/allmessages');
    }

    // Upon Clicking message for a particular user
    const handleMessage = (userId) => {
        /* Retrieve the two users that will participate in the conversation */

        const currentUser = {
            name: talkjsUser.name,
            email: talkjsUser.email,
            id: talkjsUser.id
        }
        console.log("ME: ", currentUser);

        const user = users.find(user => user.id === userId)

        const partner = {
            name: user.name,
            email: user.email,
            id: user.id,
        }

        console.log("Partner: ",partner);

        /* Session initialization code */
        Talk.ready
        .then(() => {
            /* Create the two users that will participate in the conversation */
            const me = new Talk.User(currentUser);
            const other = new Talk.User(partner)

            /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: "tqlH9Iz5",
                    me: me
                });
            } 
            
            /* Get a conversation ID or create one */
            const conversationId = Talk.oneOnOneId(me, other);
            const conversation = window.talkSession.getOrCreateConversation(conversationId);
            
            /* Set participants of the conversations */
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            /* Create and mount chatbox in container */
            Talk.chatbox = window.talkSession.createChatbox(conversation);
            Talk.chatbox.mount(Talk.container);
        })            
        .catch(e => console.error(e));
    }

    return (


        <div>

            <Navbar/>
                <Row>
                <Col lg={3}>
                    <br/><br/><br/>
                <SideNav/>
                </Col>
                <Col>
                    <div className="users">
                        <div className="users-container">
                        <ul>

                            <Button variant="outlined" style={{position:'absolute', top:80, right:300}} onClick={() => navigateToAllMessages()}>View All Messages</Button>
                            <br/>
                            <h1>Search Users to Message</h1>
                            <br/>
                            <div className='center-div'>
                                <TextField id="standard-basic" label="User's Name" variant="standard" onChange={handleSearch} placeholder="Enter User's Name" />
                            </div>
                            <br/>
                            <br/>
                            {users.length > 0 ? 
                        
                                <div>
                                    {users.map(user => <li key={user.id} className="user">
                                        <picture className="user-picture">
                                            <img src={user.profilePicture}/>
                                        </picture>
                                        <div className="user-info-container">
                                            <div className="user-info">
                                                <h4>{user.name}</h4>
                                                <p>{user.email}</p>
                                            </div>
                                            <div className="user-action">
                                                <button onClick={(userId) => handleMessage(user.id)}>Message</button>
                                            </div>
                                        </div>
                                        </li>
                                    )}

                                </div>

                            :
                                        
                            ""

                            }
                            
                        </ul>

                        <div className="chatbox-container" ref={c => Talk.container = c}>
                            <div id="talkjs-container" style={{ height: "300px" }}><i></i></div>
                        </div>
                        </div>
                    </div>
                </Col>
                </Row>

        </div>


    )
}

export default Messaging