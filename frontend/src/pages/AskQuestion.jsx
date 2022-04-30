import { Row,Col } from 'react-bootstrap';
import AskQuestionEditor from '../components/questions/AskQuestionEditor';

function AskQuestion() {
  return (
    <>
    <div><h1>Headers</h1></div>
    <div style={{"text-align":"left",
    "margin-left": "20rem",
    "margin-right":"30rem"}}>
        <img src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368" 
        style={{"float": "right",
        "height": "130px"}}>
        </img>
    <h1 className="fs-headline1">Ask a public question</h1>
    <br></br>
    <br></br>
    <AskQuestionEditor></AskQuestionEditor>
    </div>
    </>
  );
}

export default AskQuestion;