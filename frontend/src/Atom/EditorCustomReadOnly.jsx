import React,{useEffect} from "react";
import {Card} from 'react-bootstrap';
import Editor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from 'markdown-it';


export default function EditorCustom(props) {

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  useEffect(() => {
    var arr = mdParser.render(props.description)
    document.querySelector("#editor-container").innerHTML = arr
    console.log(arr)
  },[])

  return (
    <div className="App">
      <Card style={{margin:"1rem",height:"300px"}}>
      <div id="editor-container">
      </div>
      </Card>
    </div>
  );
}
