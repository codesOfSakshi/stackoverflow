import {Form,Row,Col,Card,Button} from 'react-bootstrap';
import axios from 'axios';
import {useEffect,useState} from 'react';
import CompactQuestion from '../../Atom/CompactQuestion';
import { useNavigate } from "react-router-dom";

function CompactQuestionListing({searchResult, questions}) {  
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
    let navigate = useNavigate();
    const [questionsAll, setlmain] = useState([question,question,question,question,question]);
    // const [questionsAll, setlmain] = useState([]);
    // const [state, setstate] = useState(1);
    const [headerMessage, setHeaderMessage] = useState("");
    const [numOfQuestions, setNumOfQuestions] = useState(-1);
    const routeQuestion = () =>{
      navigate(`/askquestion`)
    }

    useEffect(() => {
      if(searchResult){
        setHeaderMessage("Search Result");
        if(!Array.isArray(questions)){
          setlmain([]);
          setNumOfQuestions(0);
        } else {
          console.log("QUESTIONS: ", questions);
          setlmain(questions);
          console.log("about to read length of", questions)
          setNumOfQuestions(questions.length);
        }     
        console.log("the question(s) received in the CompactQuestionListing is/are", questions)
      } else {
        setHeaderMessage("All Questions");
        console.log("calling useeffect");
        var api="http://localhost:3001/api"+'/questions'
        var payload={
          "sortType":1,
          "type":1
        }
        axios.post(api,payload)
        .then(response => {
          console.log("got the data and the data is",response.data.data,"and the length is",response.data.data.length)
          setlmain(response.data.data);
          setNumOfQuestions(response.data.data.length);
    })
      }

      console.log("QUESTIONSALL: ", questionsAll);
      
    },[]);
    
    // Question - id, createdAt, updatedAt, upvotes[] (array of userIds), downvotes[] (array of userIds),
    //  views, title, tags[] (tag collection ids), description, 
    //  answers[] (answer collection ids), images[], userId, commentId, bestAns, status, badges, activity
  console.log('questionsALl is', questionsAll);

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
            {headerMessage} <Button onClick={routeQuestion} style={{float: 'right'}}>Ask Question</Button>
            </h2>
            <br></br>
            <Row>
            <Col>
            <h4>
            {numOfQuestions} questions
            </h4>
            </Col>
            <Col>
            <div className="s-btn-group" style={{"float":"right"}}>
                <button className="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,1)}>Interesting</button>
                <button className="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,2)}>Hot</button>
                <button className="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,3)}>Scored</button>
                <button className="s-btn s-btn__muted s-btn__outlined" role="button" onClick={e=>repopulate(e,4)}>Unanswered</button>
            </div>
            </Col>
            </Row>
            {/* {console.log("@@@##@#@# QUE ALL:",questionsAll)} */}
            {/* {questionsAll.map((question) => {console.log("@@@QQQUE: ", question)})} */}

            <div>
            </div>
            {questionsAll.map((question) =>{  return (<div key={question._id}><hr /><CompactQuestion questions={question} /></div>)})}
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