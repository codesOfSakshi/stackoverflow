import {Form,Row,Card,Button} from 'react-bootstrap';
//import axios from 'axios';
import {useEffect,useState} from 'react';
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';
import EditorCustom from '../../Atom/EditorCustom';
import {axiosInstance as authapi} from '../../services/authaxiosservice';
import jwt_decode from 'jwt-decode';


function EditQuestionPage(props) {  
  let params = useParams();
  const[tags,setTags]=useState([])
  const[selectedTags,setSelectedTags]=useState([])
  const [questionDisplay,setquestionDisplay] = useState({})
  const [question,setQuestion] = useState({})

  const[descripiton,setDescription]=useState("")
  const[images,setImages]=useState([])
  const [error,setError] = useState("");

  const token = localStorage.getItem("token");
  const decoded = token?(jwt_decode(token.split('.')[1], { header: true })):false

    let navigate = useNavigate();
    const routeQuestion = () =>{
      navigate(`/askquestion`)
    }

  useEffect(() => {
    if(decoded){
    var api="http://localhost:3001/api/questions/"+params.questionId
    axios.get(api).then(response => {
      let own = (response.data.data.user && response.data.data.user._id == decoded._id) ? 
      true : 
      navigate(`/`)

      console.log(response)
      setQuestion(response.data.data)
      setSelectedTags(response.data.data.tags)
      setDescription(response.data.data.description)
      console.log("************ description :",response.data.data.description)
      setquestionDisplay(new window.stacksEditor.StacksEditor(
          document.querySelector("#editor-container-questionDisplay-edit"),response.data.data.description,{} ))
      })

    var arrTags=[]
    var api="http://localhost:3001/api/tags"
    axios.get(api).then(
      response =>{
        response.data.map(tag =>{
          arrTags.push(tag.name)
        })
        setTags(arrTags)
      }
    )
    }
    else{
      alert("Please sign in first")
      navigate(`/`)
    }
  },[])


  const chooseOther = function(e){
      e.preventDefault();
      console.log(e)
      var incominTag = e.target.value;
      console.log(selectedTags.includes(incominTag))
      if(selectedTags.includes(incominTag)==false){
      console.log(incominTag)
      // if(true){
        var localSelectedTags = selectedTags.slice(0,)
        localSelectedTags.push(incominTag)
        setSelectedTags(localSelectedTags)
        console.log(selectedTags)
      }
  }

  const submitHandler =(e)=>{
    e.preventDefault();
    if(!descripiton){
      setError("Please Enter a valid Description !")
    }
    else{
    console.log(questionDisplay.content)
    var payload ={
      userId: decoded._id,
      title: e.target.formBasicTitle.value,
      description: descripiton,
      images:images,
      tags:selectedTags,
      _id:params.questionId,
      user: question.user
    }
    var api="http://localhost:3001/api/questions/edit"
    authapi.post(api,payload).then(response => {
      console.log("response.result",response.data.message)
      var path = "/question/"+response.data.message
      navigate(path)
      })}
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
        {/* <div id="editor-container-questionDisplay-edit"></div> */}
        {question && <EditorCustom setImages={setImages}  setDescription={setDescription} preDefault={question.description} images={question.images}></EditorCustom>}
        {error && <div style={{color: "red"}}>
        {error}
      </div>}
        <div style={{'marginTop':"3rem"}}>
        <h3>Tags</h3>
        Add up to 5 tags to describe what your question is about
        <Form.Group className="mb-3" controlId="formBasicTags" onChange={e=>chooseOther(e)}>
          <Form.Control as="select">
                {tags.map ( tag =>{
                  return(
                <option value={tag} >{tag}</option>)})}
            </Form.Control>
        </Form.Group>
        <div class="d-flex gs4">
          {selectedTags.map(tag => 
          {return(<a class="flex--item s-tag s-tag__moderator" href="#">{tag}
          <span class="s-tag--dismiss"> <div val={tag} onClick={(e)=>deleteTag(e,tag)}>X</div></span></a>)})}
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