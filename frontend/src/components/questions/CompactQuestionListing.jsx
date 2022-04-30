import {Form,Row,Col,Card,Button} from 'react-bootstrap';
import axios from 'axios';
import {useEffect,useState} from 'react';
import CompactQuestion from '../../Atom/CompactQuestion';
import { useNavigate } from "react-router-dom";

function CompactQuestionListing(props) {  
    let navigate = useNavigate();
    const routeQuestion = () =>{
      navigate(`/askquestion`)
    }
    // Question - id, createdAt, updatedAt, upvotes[] (array of userIds), downvotes[] (array of userIds),
    //  views, title, tags[] (tag collection ids), description, 
    //  answers[] (answer collection ids), images[], userId, commentId, bestAns, status, badges, activity
  const question = {
      _id : "123456789",
      createdAt:"12 Feburary 2020",
      upvotes:[1,2,3,4],
      downvotes:[1,2,3,4],
      views:5,
      title:"Duplicated calculation using subquery",
      tags:["PYTHON","JAVA"],
      description:"I am trying to reproduce the following calc: ((final_value - init_value) / init_value) * 100 Although I am getting the correct value I would like to ask if there is a better way to do this? At least, ...I am trying to reproduce the following calc: ((final_value - init_value) / init_value) * 100 Although I am getting the correct value I would like to ask if there is a better way to do this? At least, ...",
      answers:[1,2,3,4,5],
      images:[1,2,3,4,5],
      userId:"snichat97",
      commentIds:[1,2,3,4],
      bestAns:"12231232",
  }
  const [questionsAll, setlmain] = useState([question,question,question,question,question]);
  const [state, setstate] = useState(1);

  useEffect(() => {
    var api="http://localhost:3001/api"+'/questions'
    var payload={
      "sortType":1,
      "type":1
    }
    axios.post(api,payload)
    .then(response => {
      console.log(response.data.data)
      setlmain(response.data.data)
 })
  },[])

  const repopulate=(e,num)=>{
    e.preventDefault()
    var api="http://localhost:3001/api"+'/questions'
    var payload={
      "sortType":1,
      "type":num
    }
    axios.post(api,payload)
    .then(response => {
      console.log(response.data.data)
      setlmain(response.data.data)
 })
  }

  return (
    <div>
        <div style={{ width: '60rem',textAlign:'left' }}>
            <h2>
            All Questions <Button onClick={routeQuestion} style={{float: 'right'}}>Ask Question</Button>
            </h2>
            <br></br>
            <Row>
            <Col>
            <h4>
            {questionsAll.length} questions
            </h4>
            </Col>
            <Col>
            <div class="s-btn-group" style={{"float":"right"}}>
                <button class="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,1)}>Interesting</button>
                <button class="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,2)}>Hot</button>
                <button class="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,3)}>Scored</button>
                <button class="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,4)}>Unanswered</button>
            </div>
            </Col>
            </Row>
            {questionsAll.map(question =>(<><hr></hr><CompactQuestion questions={question}></CompactQuestion></>))}
            {/* <PaginatedList
            list={questionsAll}
            itemsPerPage={10}
            renderList={(list) => (list.map(question =>(<><hr></hr><CompactQuestion questions={question}></CompactQuestion></>)))}
            ></PaginatedList> */}
        </div>
    </div>
  );
}

export default CompactQuestionListing;