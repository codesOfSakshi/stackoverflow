import React, {useState, useEffect} from 'react';
import {Row, Col, Badge, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// import Editor from '../../Atom/EditorQuestion';
import axios from 'axios';
import Upvote from '../../Atom/upvote';


function QuestionsPage() {
    const [question, setQuestion] = useState({})
    const [answersall, setlans] = useState([])
    var questionDisplay, answerDisplay;
    let navigate = useNavigate();

    useEffect(() => {
        var api = "http://localhost:3001/api/questions/627189b4519c18b6b2396bed"
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
        "", )
    },[])


    const navigateToEdit = () =>{
        navigate(`/edit/${question._id}`)
      }

    const addBookmark = () =>{
        var api="http://localhost:3001/api/user/addbookmark/"+"snichat"
        var payload = {
            questionId:"627189b4519c18b6b2396bed"
        }
        axios.post(api,payload).then(response => {alert(response.data)})
    }
  
    const onDownVoteClick =()=>{
        console.log("downvote");
    }

    const onUpVoteClick =()=>{
        console.log("upvote");
    }


    return (
        <div>
            <div style={{ width: '60rem',textAlign:'justify'}}>

                <Row style={{width:"200px", marginTop:"30px", marginLeft: "0.5px",float:"right"}}>
                    <Button onClick={addBookmark} style={{float:"right"}}>Bookmark</Button>
                </Row>
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
                <br/>

                <hr></hr>
                <Row>
                    <p>
                        <>
                            <div id="editor-container-questionDisplay"></div>
                        </>
                    </p>
                </Row>

                {/* <Row style={{width:"200px", marginTop:"30px", marginLeft: "0.5px"}}>
                    <div style={{float:"right"}} >
                    <Button onClick={navigateToEdit} style={{float:"right"}}>Edit Question</Button>
                    </div>
                </Row> */}
           
            <div class="displayFlex" style={{"margin-bottom":"3rem"}}>
                {question.tags && question.tags.map( tag =>{
                    return(
                    <div class="s-badge s-badge__moderator" style={{margin:"0.5rem"}}>
                        {tag}
                    </div>
                    )})} 
                    <Col style={{float:"right"}} >
                    <Button onClick={navigateToEdit} style={{float:"right",margin:"0.5rem"}}>Edit Question</Button>
                    </Col>
            </div>
            <hr></hr>
            <div style={{backgroundColor : "#f5f6f6", display: "flex", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", height: "10vh", border: "none", outline: "none"}}>
                <form style={{height:"20px", width: "100%", border: "none", backgroundColor: "transparent", borderBottom: "2px solid #aaa", resize: "none", outline: "none"}}>
                    <textarea style={{border:"none", outline:"none", height:"20px", width: "60rem", backgroundColor: "#f5f6f6", marginTop: "-10px"}}placeholder = "Add a comment"></textarea>
                </form>
            </div>
            <br/>
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
                                    <Upvote idx={idx}  downVote={onDownVoteClick} upVote={onUpVoteClick} object={ans} type="answer" />
                                </Col>
                                <Col style={{ marginLeft: "64px", marginTop: "-115px" }}>
                                    {ans.description}
                                    <div style={{ backgroundColor: "#f5f6f6", display: "flex", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", height: "10vh", border: "none", outline: "none" }}>
                                        <form style={{ height: "20px", width: "100%", border: "none", backgroundColor: "transparent", borderBottom: "2px solid #aaa", resize: "none", outline: "none" }}>
                                            <textarea style={{ border: "none", outline: "none", height: "20px", width: "50rem", backgroundColor: "#f5f6f6", marginTop: "-10px" }} placeholder="Add a comment"></textarea>
                                        </form>
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