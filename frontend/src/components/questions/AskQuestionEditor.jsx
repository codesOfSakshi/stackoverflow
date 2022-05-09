import {Form,Row,Card,Button} from 'react-bootstrap';
//import axios from 'axios';
import {useEffect,useState,useRef} from 'react';
import CompactQuestion from '../../Atom/CompactQuestion';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Cookies from 'universal-cookie';
import MarkdownIt from 'markdown-it';
import Editor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from "react-markdown";
import EditorCustom from '../../Atom/EditorCustom';
import S3FileUpload from 'react-s3';
import { Buffer } from 'buffer';
import jwt_decode from 'jwt-decode';


function AskQuestionEditor(props) {  
  const[tags,setTags]=useState([])
  const[selectedTags,setSelectedTags]=useState([])
  const[descripiton,setDescription]=useState("")
  const [imageArray, setImage] = useState([]);
  const [uploadUrl,setUploadUrl] = useState([]);

  const cookies = new Cookies();
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token.split('.')[1], { header: true });
    let navigate = useNavigate();
    const routeQuestion = () =>{
      navigate(`/askquestion`)
    }
  var arr;
  const imageGallery = [
    "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
];


  useEffect(() => {
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
  },[])

  const submitHandler =(e)=>{
    console.log(arr);
    e.preventDefault();
    var payload ={
      user: decoded._id,
      title: e.target.formBasicTitle.value,
      description: descripiton,
      tags:selectedTags,
      images:imageArray
      // userId: question.user._id
    }
    var api="http://localhost:3001/api/questions/add"
    axios.post(api,payload).then(response => {
      alert(response)
      })
  }

  const deleteTag = (e,val) =>{
    e.preventDefault()
    console.log("Deleting Tag : ",e)
    var localSelectedTags = selectedTags.slice(0,)
    const index = localSelectedTags.indexOf(val);
    console.log("Deleting Tag : ",val)
    if (index > -1) {
      localSelectedTags.splice(index, 1); // 2nd parameter means remove one item only
    }
    setSelectedTags(localSelectedTags)
    console.log(selectedTags)
  }


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

  const submitHandlerImage = function(e){
  //   e.preventDefault();
  //   var form=e.target
  //   const formData = new FormData();
  //   formData.append("image", form.formFileSm.files[0])

  //   var api="http://localhost:3001/api"+'/shop/editImage'

  //   axios.post(api,formData,{'Content-Type': 'multipart/form-data'})
  //   .then(response => {
  //       alert(response.data)
  //   });
  // }

  // const submitHandlerImage =  () => {
  //   console.log();
  //   var file = event.target.files[0];



  //   // get secure url from our server
  //   const  server_url  =
  //       await fetch("http://localhost:3001/s3Url/addImage")
  //           .then(response => {
  //               return response.json()
  //           })
  //           .then(data => {
  //               console.log(data.server_url)
  //               setUploadUrl(data.server_url)
  //           })
  //   console.log("server url")
  //   console.log(uploadUrl)

  //   // post the image direclty to the s3 bucket
  //   fetch(uploadUrl, {
  //       method: "PUT",
  //       headers: {
  //           "Content-Type": "multipart/form-data"
  //       },
  //       body: file
  //   })

  //   const imageUrl = uploadUrl.split('?')[0]
  //   console.log(imageUrl)
  //   cookies.set('imageUrl', imageUrl, { path: '/' });


    // this.setState({
    //     mainState: "uploaded",
    //     selectedFile: event.target.files[0],
    //     imageUploaded: 1
    // });
};


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
        {/* <MdEditor style={{ height: '500px' }} onChange={handleEditorChange} onImageUpload={onImageUpload} /> */}
        {/* <Editor
        ref={mdEditor}
        value={value}
        style={{
          height: "500px"
        }}
        onChange={handleEditorChange}
        renderHTML={text => <ReactMarkdown source={text} />}
      /> */}
      {/* <Editor
        ref={mdEditor}
        value={value}
        style={{
          height: "400px"
        }}
        onChange={handleEditorChange}
        onImageUpload={onImageUpload}
        renderHTML={text => mdParser.render(text)}
      /> */}
      <EditorCustom setDescription={setDescription} setImage={setImage}></EditorCustom>
        {/* <div id="editor-container"></div> */}
        {/* <table>
          {imageGallery && imageGallery.map(image => {
            return(<tr style={{marginTop:"1rem"}}>
              <img src={image} style={{width:"3rem",height:"3rem"}}/>
            </tr>)
          })}
          </table> */}
          {/* <Form onSubmit={(e)=>submitHandlerImage(e)}>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Label><span class="icon-bg iconImage"></span></Form.Label>
            <Form.Control type="file" size="sm" />
          </Form.Group>

          <Button variant="primary" type="submit">
              Add Image
          </Button> */}

          {/* </Form> */}
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

export default AskQuestionEditor;