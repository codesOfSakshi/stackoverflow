import React , {useEffect, useState} from 'react'
import { TextField } from '@mui/material';
import axios from 'axios';
import Talk from "talkjs";
import './Messaging.css'

function Messaging() {

    const [users, setUsers] = useState([]);
    // const [talkingUser, setCurrentUser] = useState({});
    const meUser = localStorage.getItem("currentTalkjsUser");
    let aybro;
    if (meUser) {
        aybro = JSON.parse(meUser);
    }


    // Searches the users by the name
    const handleSearch = (e) => {
        
        console.log("Searching for users: ", e.target.value)
    
        let search = e.target.value
        if(search.length >= 3){
            
            axios.get("http://localhost:3001/api/user/searchbyname/" + search)
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

    // Upon Clicking message for a particular user
    const handleMessage = (userId) => {
        /* Retrieve the two users that will participate in the conversation */
        const currentUser = aybro;

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


        <div className="users">
        
            <div className="users-container">
            <ul>
                <h1>Searc users to Message</h1>
                <br/>
                <TextField id="standard-basic" style={{marginLeft:170, width:150}} label="User's Name" variant="standard" onChange={handleSearch} placeholder="Enter User's Name" />
                <br/>
                <br/>
                {users.length > 0 ? 
            
                    <div>
                        {users.map(user => <li key={user.id} className="user">
                            <picture className="user-picture">
                                <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg" />
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
    )
}

export default Messaging