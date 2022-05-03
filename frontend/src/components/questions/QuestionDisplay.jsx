import React, {useState,useEffect} from 'react';
import {Row, Col, Badge, Button} from 'react-bootstrap';
// import {PaginatedList} from 'react-paginated-list';
import Editor from '../../Atom/EditorQuestion';
import axios from 'axios';


function QuestionsPage(){
    const [question,setQuestion] = useState({})
    const[answersall, setlans] =  useState([])  
    useEffect(() => {
      var api="http://localhost:3001/api/questions/626cca47021472214c424d6d"
      axios.get(api).then(response => {
        console.log(response)
        setQuestion(response.data.data)
        setlans(response.data.data.answers)
        })
    },[])

    // const question = {
    //     _id : "123456789",
    //     createdAt:"12 Feburary 2020",
    //     upvotes:[1,2,3,4],
    //     downvotes:[1,2,3,4],
    //     views:5,
    //     title:"Duplicated calculation using subquery",
    //     tags:["PYTHON","JAVA"],
    //     description:"I am trying to reproduce the following calc: ((final_value - init_value) / init_value) * 100 Although I am getting the correct value I would like to ask if there is a better way to do this? At least, ...I am trying to reproduce the following calc: ((final_value - init_value) / init_value) * 100 Although I am getting the correct value I would like to ask if there is a better way to do this? At least, ...",
    //     answers:[1,2,3,4,5],
    //     images:[1,2,3,4,5],
    //     userId:"snichat97",
    //     commentIds:[1,2,3,4],
    //     bestAns:"12231232",
    //     asked: 'today',
    //     modified: 'today',
    //     views: '3 times'
    // }

    

    return(
        <div>
        <div style={{ width: '60rem',textAlign:'justify'}}>
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
                    {question.description}
                    </>
                </p>
            </Row>
            
            <div class="displayFlex" style={{"margin-bottom":"1rem"}}>
                {question.tags && question.tags.map( tag =>{
                    return(<>
                    <Badge 
                    style={{"marginLeft":"3px"}}>
                        {tag}
                    </Badge>
                    </>)})} 
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
            {/* <div>
                <PaginatedList
                    list={answersall}
                    itemsPerPage={4}
                    renderList={(list) => list.map((ans)=>{
                        return(<><hr></hr><Row>
                            <div>
                                {ans.answer}
                                <div style={{backgroundColor : "#f5f6f6", display: "flex", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", height: "10vh", border: "none", outline: "none"}}>
                                    <form style={{height:"20px", width: "100%", border: "none", backgroundColor: "transparent", borderBottom: "2px solid #aaa", resize: "none", outline: "none"}}>
                                        <textarea style={{border:"none", outline:"none", height:"20px", width: "900px", backgroundColor: "#f5f6f6", marginTop: "-10px"}}placeholder = "Add a comment"></textarea>
                                    </form>
                                </div>
                            </div>
                            </Row></>);
                    })}
                ></PaginatedList>
            </div> */}
            <div>
                {answersall && answersall.map((ans)=>{
                    return(<><hr></hr>
                    <Row>
                        <Col>
                            {ans.upVotes.length} votes
                        </Col>
                        <Col style={{marginLeft:"100px", marginTop:"-30px"}}>
                            {ans.description}
                            <div style={{backgroundColor : "#f5f6f6", display: "flex", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", height: "10vh", border: "none", outline: "none"}}>
                                <form style={{height:"20px", width: "100%", border: "none", backgroundColor: "transparent", borderBottom: "2px solid #aaa", resize: "none", outline: "none"}}>
                                    <textarea style={{border:"none", outline:"none", height:"20px", width: "800px", backgroundColor: "#f5f6f6", marginTop: "-10px"}}placeholder = "Add a comment"></textarea>
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
                <Row style={{}}>
                    <Editor></Editor>
                </Row>
                <Row style={{width:"200px", marginTop:"300px", marginLeft: "0.5px"}}>
                    <Button>Post Your Answer</Button>
                </Row>
            </div>
        </div>
    </div>
    );

}

export default QuestionsPage;