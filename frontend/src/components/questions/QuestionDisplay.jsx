import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// import Editor from '../../Atom/EditorQuestion';
import axios from 'axios';
import Upvote from '../../Atom/upvote';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';

const markdown = `Just a link: https://reactjs.com.`


function QuestionsPage(props) {
    let params = useParams();
    const [question, setQuestion] = useState({})
    const [answersall, setlans] = useState([])
    const [qcomment, setqComment] = useState([])
    const [acomment, setaComment] = useState([])
    var questionDisplay, answerDisplay;
    let navigate = useNavigate();
    var type = 'question'

    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token.split('.')[1], { header: true });
    console.log("decode", decoded)


    useEffect(() => {
        var api = "http://localhost:3001/api/questions/" + params.id
        axios.get(api).then(response => {
            console.log(response)
            setQuestion(response.data.data)
            setlans(response.data.data.answers)

            questionDisplay = new window.stacksEditor.StacksEditor(
                document.querySelector("#editor-container-questionDisplay"),
                response.data.data.description)
        })

        answerDisplay = new window.stacksEditor.StacksEditor(
            document.querySelector("#editor-container-answerDisplay"),
            "")
    }, [])


    const navigateToEdit = () => {
        navigate(`/edit/${question._id}`)
    }

    const addBookmark = () => {
        console.log("addBookmark")
        var api = "http://localhost:3001/api/user/addbookmark/" + "snichat"
        var payload = {
            questionId: "627189b4519c18b6b2396bed"
        }
        axios.post(api, payload).then(response => { alert(response.data) })
    }

    const saveQuesComment = () => {
        type = 'question'
        axios.post("http://localhost:3001/api/comment", { type: type, questionId: question._id, comment: qcomment })
            .then(response => {
                console.log(response);
            })
    }
    // const saveAnsComment = () =>{
    //     type = 'answer'
    //     axios.post("http://localhost:3001/api/comment", {type:type, answerId:ans._id, comment : acomment})
    //             .then(response => {
    //                 console.log(response);
    //             })


    // }

    return (
        <div>
            <div style={{ width: '60rem', textAlign: 'justify' }}>

                <Row>
                    <Col xs={1}>
                        <Upvote type="question" object={question} addBookmark={addBookmark} />
                    </Col>
                    <Col>
                        <h2>
                            {question.title}
                        </h2>
                        <div>
                            <Row>
                                <Col>

                                    Asked : <b>{question.asked}</b>

                                </Col>
                                <Col>

                                    Modified : <b>{question.modified}</b>

                                </Col>
                                <Col>

                                    Viewed : <b>{question.views}</b>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <br />

                <hr></hr>

                <Row>
                    <Col xs={1}>
                        {/* {console.log(ans)}
                            {ans.upVotes.length} votes */}
                        <Upvote object={question} decoded={decoded} type="question" />
                    </Col>
                    <Col    >
                        <p>
                            <>
                                <div id="editor-container-questionDisplay"></div>
                            </>
                        </p>
                    </Col>
                </Row>


                {/* <Row style={{width:"200px", marginTop:"30px", marginLeft: "0.5px"}}>
                    <div style={{float:"right"}} >
                    <Button onClick={navigateToEdit} style={{float:"right"}}>Edit Question</Button>
                    </div>
                </Row> */}


                <div class="displayFlex" style={{ "margin-bottom": "3rem" }}>
                    {question.tags && question.tags.map(tag => {
                        return (
                            <div class="s-badge s-badge__moderator" style={{ margin: "0.5rem" }}>
                                {tag}
                            </div>
                        )
                    })}
                    <Col style={{ float: "right" }} >
                        <Button onClick={navigateToEdit} style={{ float: "right", margin: "0.5rem" }}>Edit Question</Button>
                    </Col>
                </div>
                <hr></hr>
                <div style={{ backgroundColor: "#f5f6f6", display: "flex", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", height: "10vh", border: "none", outline: "none" }}>
                    <form style={{ height: "20px", width: "100%", border: "none", backgroundColor: "transparent", borderBottom: "2px solid #aaa", resize: "none", outline: "none" }}>
                        <textarea style={{ border: "none", outline: "none", height: "20px", width: "60rem", backgroundColor: "#f5f6f6", marginTop: "-10px" }} placeholder="Add a comment" onChange={(e) => { setqComment(e.target.value); }}></textarea>
                    </form>
                    <Button onClick={saveQuesComment} style={{ float: "right", height: "25px", width: "100%", marginTop: "70px", marginLeft: "-50px", backgroundColor: "#f5f6f6", color: "blue", border: "none" }}>save</Button>
                </div>

                <br />
                <div>
                    <Row>
                        <Col>
                            <h5>{answersall.length} Answers</h5>
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                            <label for="sort">Sorted by:</label>

                            <select name="sort" id="sort">
                                <option value="score">Highest score (default)</option>
                                <option value="new">Date modified (newest first)</option>
                                <option value="old">Date created (oldest first)</option>
                            </select>
                        </Col>
                    </Row>
                </div>
                <div>
                    {answersall && answersall.map((ans, idx) => {
                        return (<><hr></hr>
                            <Row>
                                <Col xs={1}>
                                    {/* {console.log(ans)}
                            {ans.upVotes.length} votes */}
                                    <Upvote idx={idx} object={ans} decoded={decoded} question={question} type="answer" />
                                </Col>
                                <Col style={{ marginLeft: "64px", marginTop: "-115px" }}>
                                    {ans.description}
                                    <div style={{ backgroundColor: "#f5f6f6", display: "flex", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", height: "10vh", border: "none", outline: "none" }}>
                                        <form style={{ height: "20px", width: "100%", border: "none", backgroundColor: "transparent", borderBottom: "2px solid #aaa", resize: "none", outline: "none" }}>
                                            <textarea style={{ border: "none", outline: "none", height: "20px", width: "50rem", backgroundColor: "#f5f6f6", marginTop: "-10px" }} placeholder="Add a comment" onChange={(e) => { setaComment(e.target.value); }}></textarea>
                                        </form>
                                        <Button onClick={() => {
                                            type = "answer";
                                            axios.post("http://localhost:3001/api/comment", { type: type, answerId: ans._id, comment: acomment })
                                                .then(response => {
                                                    console.log(response);
                                                })
                                        }} style={{ float: "right", height: "25px", width: "100%", backgroundColor: "#f5f6f6", color: "blue", border: "none" }}>save</Button>
                                    </div>
                                </Col>
                            </Row></>);
                    })}
                </div>
                <div>
                    <Row>
                        <h3>
                            Your Answer
                        </h3>
                    </Row>
                    {/* <Row style={{}}>
                    <Editor></Editor>
                </Row> */}
                    <div id="editor-container-answerDisplay"></div>
                    <Row style={{ width: "200px", marginTop: "30px", marginLeft: "0.5px" }}>
                        <Button>Post Your Answer</Button>
                    </Row>
                </div>
            </div>
        </div>
    );

}

export default QuestionsPage;