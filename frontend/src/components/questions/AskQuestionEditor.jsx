import {Form,Row,Card,Button} from 'react-bootstrap';
//import axios from 'axios';
import {useEffect,useState} from 'react';
import CompactQuestion from '../../Atom/CompactQuestion';
import { useNavigate } from "react-router-dom";
import MyEditor from '../../Atom/EditorQuestion';
// Don’t forget to include the styles as well
import "@stackoverflow/stacks-editor/dist/";


function AskQuestionEditor(props) {  
    let navigate = useNavigate();
    const routeQuestion = () =>{
      navigate(`/askquestion`)
    }

  useEffect(() => {
    // var api="http://localhost:3900/api"+'/orders/user/'+props.user._id
    // var ordersfresh=[]
    // axios.get(api)
    // .then(response => {
    //   setorders(response.data) 
    //   var l=[];
    //   var orderId=0;
    //   var l_main=[]
    //   setlmain(response.data)
    //   console.log(lmain)
 // })
    new window.stacksEditor.StacksEditor(
      document.querySelector("#editor-container"),
      "", {}
    );
  },[])

  return (
    <div>
        <Card style={{"width":"60rem"}}>
        <h3>Title</h3>
        Be specific and imagine you’re asking a question to another person
        <h3>Body</h3>
        Include all the information someone would need to answer your question
        <div id="editor-container"></div> 
        <h3>Tags</h3>
        Add up to 5 tags to describe what your question is about
        </Card>
    </div>
  );
}

export default AskQuestionEditor;