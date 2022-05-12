import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Badge, Button, Card } from 'react-bootstrap';
import {useParams} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import ReactTimeAgo from 'react-time-ago';

const Answer = (props) => {

    let params = useParams();
    const[value, setValue] = useState("")
    const [acomment, setaComment] = useState("")
    const [aerror, asetError] = useState("")
    var type = 'answer'
    const [addcomment, setaddcomment] = useState("Add a comment")

    const token = localStorage.getItem("token");
    const decoded = token?(jwt_decode(token.split('.')[1], { header: true })):false

    const trim=(x)=>{
        return x.replace(/^\s+|\s+$/gm, '');
      }

    return (
        <div>
            <div>
                {props.ans.comment && props.ans.comment.map(com =>{
                    return(
                        <>
                            <hr></hr>
                            {com.comment} –&nbsp;
                            <a href={"/user/" + com.user}>{com.name}</a> &nbsp;
                            <time>{com.createdAt &&<ReactTimeAgo date={Date.parse(com.createdAt)} locale="en-US" />}</time>
                        </>
                    );
                })}
                <br/>
                <div style={{ backgroundColor: "#f5f6f6", display: "flex", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", height: "10vh", border: "none", outline: "none" }}>
                    <form style={{ height: "20px", width: "100%", border: "none", backgroundColor: "transparent", borderBottom: "2px solid #aaa", resize: "none", outline: "none" }}>
                        <textarea style={{ border: "none", outline: "none", height: "20px", width: "50rem", backgroundColor: "#f5f6f6", marginTop: "-10px" }} placeholder={addcomment} onChange={
                            (e) => {
                                setaComment(e.target.value); 
                            }} 
                            value = {acomment}></textarea>
                    </form>
                    <Button onClick={() => {
                        type = "answer";

                        if(!trim(acomment)){
                            asetError("Please enter a valid comment")
                        }
                        else{
                            setaComment("")
                            axios.post("http://localhost:3001/api/comment", { type: type, answerId: props.ans._id, comment: acomment, user: decoded._id, name: decoded.name })
                                .then(response => {
                                    console.log("////////", response);
                                    // value ? setValue(false) : setValue(true)
                                })
                            props.function();
                        }
                            
                    }} style={{ float: "right", height: "25px", width: "100%", backgroundColor: "#f5f6f6", color: "blue", border: "none" }}>save</Button>
                </div>
                {aerror && <div style={{color: "red"}}>
                    {aerror}
                </div>}
            </div>
        </div>
    );

}

export default Answer;