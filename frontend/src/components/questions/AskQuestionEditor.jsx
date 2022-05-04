import {Form,Row,Card,Button} from 'react-bootstrap';
//import axios from 'axios';
import {useEffect,useState} from 'react';
import CompactQuestion from '../../Atom/CompactQuestion';
import { useNavigate } from "react-router-dom";
import MyEditor from '../../Atom/EditorQuestion';
// Don’t forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/";
import axios from 'axios';


function AskQuestionEditor(props) {  
  const[tags,setTags]=useState(["JAVA","PYTHON","PYTHON-2.5"])
  const[selectedTags,setSelectedTags]=useState(["JAVA","PYTHON"])
    let navigate = useNavigate();
    const routeQuestion = () =>{
      navigate(`/askquestion`)
    }
  var arr;

  useEffect(() => {
    arr = new window.stacksEditor.StacksEditor(
    document.querySelector("#editor-container"),
    "", )
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
    console.log(arr.content)
    var payload ={
      userId: "snichat97",
      title: e.target.formBasicTitle.value,
      description: arr.content,
      tags:selectedTags
    }
    var api="http://localhost:3001/api/questions/add"
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
            <Form.Control type="text" placeholder="Enter title" />
        </Form.Group>

        <h3>Body</h3>
        Include all the information someone would need to answer your question
        {/* <MyEditor/> */}
        <div id="editor-container"></div>
        <div style={{'marginTop':"3rem"}}>
        <h3>Tags</h3>
        Add up to 5 tags to describe what your question is about
        <Form.Group className="mb-3" controlId="formBasicTags" onChange={e=>chooseOther(e)}>
            <select>
                {tags.map ( tag =>{
                  return(
                <option value={tag} >{tag}</option>)})}
            </select>
        </Form.Group>
        <div class="d-flex gs4">
          {selectedTags.map(tag => 
          {return(<a class="flex--item s-tag s-tag__moderator" href="#">{tag}
          <span class="s-tag--dismiss"> <div val={tag} onClick={(e,tag)=>deleteTag(e,tag)}>X</div></span></a>)})}
      </div></div>

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

export default AskQuestionEditor;