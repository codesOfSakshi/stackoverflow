import React, { useState, useEffect } from 'react';
import { Row, Col, Badge, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
// import Editor from '../../Atom/EditorQuestion';
import Editor from "react-markdown-editor-lite";
import axios from 'axios';
import Upvote from '../../Atom/upvote';
import EditorCustomReadOnly from '../../Atom/EditorCustomReadOnly'
import EditorCustom from '../../Atom/EditorCustom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarkdownIt from 'markdown-it';
import jwt_decode from 'jwt-decode';
import ReactTimeAgo from 'react-time-ago';
import UserCard from '../../Atom/UserCard';

const markdown = `Just a link: https://reactjs.com.`


function QuestionsPage(props) {
    let params = useParams();
    const [question, setQuestion] = useState({})
    const [answersall, setlans] = useState([])
    const [answer, setAnswer] = useState("")
    const [owner, setOwner] = useState(false)
    const[comments, setComments] = useState([])
    var questionDisplay, answerDisplay;
    let navigate = useNavigate();
    var arr

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const [qcomment, setqComment] = useState([])
    const [acomment, setaComment] = useState([])
    var questionDisplay, answerDisplay;
    var type = 'question'

    const token = localStorage.getItem("token");
    const decoded = token?(jwt_decode(token.split('.')[1], { header: true })):false
    console.log("decode", decoded)

    useEffect(() => {
        console.log("Q ID: ", params.id)
        var api = "http://localhost:3001/api/questions/" + params.id
        axios.get(api).then(response => {
            console.log(response)
            setQuestion(response.data.data)
            console.log("DISPLAYED QUESTION", response.data.data);
            setlans(response.data.data.answers)
            let own = (decoded && response.data.data.user && response.data.data.user._id == decoded._id) ? true : false
            setOwner(own)
            setComments(response.data.data.comment)
        })
    }, [])


    const navigateToEdit = () => {
        navigate(`/edit/${question._id}`)
    }

    const addBookmark = () => {
        if(!decoded){
            alert("Redirecting to login ...")
            navigate("/")
        }
        else{
        var api = "http://localhost:3001/api/user/addbookmark/" + decoded._id
        var payload = {
            questionId: question._id
        }
        axios.post(api, payload).then(response => { alert(response.data) })
    }
    }

    const saveQuesComment = () => {
        type = 'question'
        axios.post("http://localhost:3001/api/comment", { type: type, questionId: question._id, comment: qcomment })
            .then(response => {
                console.log(response);
            })
    }

    const recordAnswer = () => {
        if(!decoded){
            alert("Redirecting to login ...")
            navigate("/")
        }
        else{
        console.log("upvote");
        var api = "http://localhost:3001/api/answer"
        var payload = {
            questionId: question._id,
            answer: answer,
            user: decoded._id,
        }
        axios.post(api, payload).then(response => { alert(response.data) })
    }
    }


    return (
        <div>
            {((owner && question.status=="PENDING")|| question.status=="APPROVED")?(<div style={{ width: '60rem', textAlign: 'justify' }}>
                <Row style={{ textAlign: 'left' }}>
                    <h2>
                        {question.title}
                    </h2>
                </Row>
                <div>
                    <Row>
                        <Col>

                            Asked :

                            <time class="s-user-card--time">
                                {question.createdAt &&
                                    <ReactTimeAgo date={Date.parse(question.createdAt)} locale="en-US" />}</time>

                        </Col>
                        {question.updatedAt && (
                            <Col>

                                Modified :

                                <time class="s-user-card--time">
                                    {question.updatedAt &&
                                        <ReactTimeAgo date={Date.parse(question.updatedAt)} locale="en-US" />}</time>

                            </Col>)}
                        <Col>

                            Viewed : <b>{question.views}</b>

                        </Col>
                        <Col>
                            <Button onClick={addBookmark} style={{ float: "right" }}>Bookmark</Button>
                        </Col>
                    </Row>
                </div>
                <br />

                <hr></hr>

                <Row>
                    <Col xs={1}>
                        {/* {console.log(ans)}
                            {ans.upVotes.length} votes */}
                        <Upvote object={question} decoded={decoded} type="question" />
                    </Col>
                    <Col>
                        <EditorCustomReadOnly description={question.description}></EditorCustomReadOnly>
                    </Col>
                </Row>


                {/* <Row style={{width:"200px", marginTop:"30px", marginLeft: "0.5px"}}>
                    <div style={{float:"right"}} >
                    <Button onClick={navigateToEdit} style={{float:"right"}}>Edit Question</Button>
                    </div>
                </Row> */}

                <div class="displayFlex" style={{ "margin-bottom": "3rem" }}>
                    {question.tags && question.tags.map(tag => {
                        var route= "/tag/"+tag
                        return (<><div class="s-post-summary--meta-tags">
                        <a class="s-tag" href={route}>
                            {tag}</a>
                        </div></>)
                    })}
                    <Col style={{ float: "right" }} >
                    {owner && <Button onClick={navigateToEdit} style={{ float: "right", margin: "0.5rem" }}>Edit Question</Button>}
                        <UserCard date={question.createdAt} user={question.user}></UserCard>
                    </Col>

                </div>
                <hr></hr>
                <div>
                    {comments && comments.map(comment =>{
                        return(
                            <>
                                {comment}
                                <hr></hr>
                            </>
                        );
                    })}
                    
                </div>
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
                                    <Upvote idx={idx} object={ans} decoded={decoded} question={question} type="answer" owner={owner} />
                                </Col>
                                <Col style={{ marginLeft: "64px"}}>
                                    {ans.description}
                                </Col>
                            </Row>
                            <Row>
                                <div>
                                {ans.comment && ans.comment.map(com =>{
                                    return(
                                        <>
                                            <hr></hr>
                                            {com}
                                        </>
                                    );
                                })}
                                </div>
                                <br/>
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
                            </Row>
                            </>);
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

                    <EditorCustom setDescription={setAnswer} preDefault="" height="300px"></EditorCustom>
                    <Row style={{ marginTop: "30px", marginLeft: "0.5px" }}>
                        <Button onClick={recordAnswer} style={{ float: "center" }}>Post Your Answer</Button>
                    </Row>
                </div>
            </div>):
            (<div class="s-empty-state wmx4 p48">
            <p>This question is waiting for approval from the admin.</p>
        </div>)}
        </div>
    );

}

export default QuestionsPage;