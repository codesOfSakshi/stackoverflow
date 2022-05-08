import {Card,Col,Row,Badge} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import './atom.css';
import { useNavigate } from "react-router-dom";

function CompactQuestion(props) {  
    const question = props.questions
    const questionLink = "/question/"+props.questions._id
    const userLink = "/user/"+"abhsjdahj"

    let navigate = useNavigate();
    const questiondisplay = () =>{
      navigate(`/question/${props.questions._id}`)
    }

  return (
    <div>
        <Card class="border-0">
        <div>
            <Row>
                <Col lg={2} style={{"text-align": "right"}}>
                    {question.upVotes && question.upVotes.length} votes
                    <br></br>
                    {question.answers && question.answers.length} answers
                    <br></br>
                    {question.views} views
                </Col>

                <Col class="alignLeft">
                    <a href={questionLink}><div class="alignLeft" style={{"margin-bottom":"-0.5rem"}}>{question.title} </div></a>
                    <br></br>
                    {/* <div class="s-post-summary--content-excerpt limitDescription">
                    {question.description} 
                    </div>
                    <br></br> */}
                    <div class="displayFlex" style={{"margin-bottom":"1rem"}}>
                    {question.tags.map( tag =>{
                        return(<>
                        <Badge 
                        className = 's-tag-badge'
                        style={{"margin-left":"3px"}}>
                            {tag}
                        </Badge>
                        </>)})}
                        <div class="userId">
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