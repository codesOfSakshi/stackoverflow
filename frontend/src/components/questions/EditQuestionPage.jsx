import {Form,Row,Card,Button} from 'react-bootstrap';
//import axios from 'axios';
import {useEffect,useState} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
// import question from '../../../../backend/models/question';
// import EditQuestion from '../../pages/EditQuestion';
import jwt_decode from 'jwt-decode';


function EditQuestionPage(props) {  
  let params = useParams();
  const[tags,setTags]=useState(["JAVA","PYTHON","PYTHON-2.5"])
  const[selectedTags,setSelectedTags]=useState([])
  const [questionDisplay,setquestionDisplay] = useState({})
  const [question,setQuestion] = useState({})
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token.split('.')[1], { header: true });
  const [initialDescription,setDescripition] = useState("")
    let navigate = useNavigate();
    const routeQuestion = () =>{
      navigate(`/askquestion`)
    }

  useEffect(() => {
    var api="http://localhost:3001/api/questions/"+params.questionId
    axios.get(api).then(response => {
      console.log(response)
      setQuestion(response.data.data)
      setSelectedTags(response.data.data.tags)
      console.log("************ description :",response.data.data.description)
      setquestionDisplay(new window.stacksEditor.StacksEditor(
          document.querySelector("#editor-container-questionDisplay-edit"),response.data.data.description,{} ))
      })
  },[])


  const chooseOther = function(e){
      e.preventDefault();
      var incominTag = e.target.value;
      console.log(selectedTags.includes(incominTag))
      if(selectedTags.includes(incominTag)==false){
      console.log(incominTag)
      // if(true){
        var localSelectedTags = selectedTags.slice()
        localSelectedTags.push(incominTag)
        setSelectedTags(localSelectedTags)
        console.log(selectedTags)
      }
  }

  const submitHandler =(e)=>{
    e.preventDefault();
    console.log(questionDisplay.content)
    var payload ={
      userId: decoded._id,
      title: e.target.formBasicTitle.value,
      description: questionDisplay.content,
      tags:selectedTags,
      _id:params.questionId
    }
    var api="http://localhost:3001/api/questions/edit"
    axios.post(api,payload).then(response => {
      alert(response)
      })


  }

  const deleteTag = (e,val) =>{
    e.preventDefault()
    console.log("Deleting Tag : ",val)
    var localSelectedTags = selectedTags.slice()
    const index = localSelectedTags.indexOf(val);
    console.log("Deleting Tag : ",val)
    if (index > -1) {
      localSelectedTags.splice(index, 1); // 2nd parameter means remove one item only
    }
    setSelectedTags(localSelectedTags)
    console.log(selectedTags)
  }

  return (
    <div>
        <Card style={{"width":"60rem"}}>
        <h3>Title</h3>
        Be specific and imagine you’re asking a question to another person
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Control type="text" placeholder={question.title} value={question.title} />
        </Form.Group>

        <h3>Body</h3>
        Include all the information someone would need to answer your question
        {/* <MyEditor/> */}
        <div id="editor-container-questionDisplay-edit"></div>
        <div style={{'marginTop':"3rem"}}>
        <h3>Tags</h3>
        Add up to 5 tags to describe what your question is about
        <Form.Group className="mb-3" controlId="formBasicTags" onChange={e=>chooseOther(e)}>
            <select className="mb-3">
                {tags && tags.map ( tag =>{
                  return(
                <option value={tag} >{tag}</option>)})}
            </select>
        </Form.Group>
        <div class="d-flex gs4">
          {selectedTags.map(tag => 
          {return(<a class="flex--item s-tag s-tag__moderator" href="#">{tag}
          <span class="s-tag--dismiss"> <div val={tag} onClick={(e,tag)=>deleteTag(e,tag)}>X</div></span></a>)})}
      </div>
      </div>

        <center>
        <Button variant="primary" type="submit" style={{'marginTop':"2rem"}}>
            Review your question 
        </Button>
        </center>
        </Form>
        </Card>
    </div>
  );
}

export default EditQuestionPage;