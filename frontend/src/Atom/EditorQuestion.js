import React, { useState,useEffect } from 'react';
import './atom.css'


// Don’t forget to include the styles as well
export default function MyEditor() {

  useEffect(() => {
    new window.stacksEditor.StacksEditor(
      document.querySelector("#editor-container"),
      "<div id='character'></div>", {}
    );
  },[])

  return (
    <div style={{height:"10rem"}}>
    <div id="editor-container"></div>
    </div>
  );
}