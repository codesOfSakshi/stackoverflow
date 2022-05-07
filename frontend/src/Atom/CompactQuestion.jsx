import {Card,Col,Row,Badge} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import './atom.css';
import { useNavigate } from "react-router-dom";

function CompactQuestion(props) { 
    
    console.log("PROPS IN COMPACT QUES: ", props);
    
    console.log("props.questions: ", props.questions);

    
    const question = props.questions
    const questionLink = "/question/"+props.questions._id
    const userLink = "/user/"+"abhsjdahj"

    let navigate = useNavigate();
    const questiondisplay = () =>{
      navigate(`/question/${props.questions._id}`)
    }


  return (
    
    
    
    
    
    
    <div>
        <Card className="border-0">
        <div>
            <Row>
                <Col lg={2} style={{"textAlign": "right"}}>
                    {question.upVotes && question.upVotes.length} votes
                    <br></br>
                    {question.answers && question.answers.length} answers
                    <br></br>
                    {question.views} views
                </Col>

                <Col className="alignLeft">
                    <a href={questionLink}><div className="alignLeft" style={{"marginBottom":"-0.5rem"}}>{question.title} </div></a>
                    <br></br>
                    <div className="s-post-summary--content-excerpt limitDescription">
                    {question.description} 
                    </div>
                    <br></br>
                    <div className="displayFlex" style={{"marginBottom":"1rem"}}>
                    {question.tags.map( (tag, index) =>{
                        return(<>
                        <Badge 
                        className = 's-tag-badge'
                        style={{"marginLeft":"3px"}}>
                            {tag}
                        </Badge>
                        </>)})}
                        <div className="userId">
                            <a href={userLink}> {question.userId} </a>
                            | 
                            {question.createdAt}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
        </Card>
    </div>
  );
}

export default CompactQuestion;