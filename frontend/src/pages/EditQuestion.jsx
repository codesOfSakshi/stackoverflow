import { Row,Col } from 'react-bootstrap';
import EditQuestionPage from '../components/questions/EditQuestionPage';

function EditQuestion() {
return (
    <>
    <div><h1>Headers</h1></div>
    <Row>
      <Col lg={2}></Col>
      <Col>
    <img src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368" 
        style={{"float": "right",
        "height": "130px"}}>
        </img>
    <h1 className="fs-headline1" style={{"paddingTop":"3rem"}}>Edit Question</h1>
    </Col>
    </Row>
    <Row>
    
    <div style={{"text-align":"left",
    "margin-left": "20rem",
    "margin-right":"30rem"}}>
    <br></br>
    <br></br>
    <EditQuestionPage></EditQuestionPage>
    </div>
    </Row>
    </>
  );
}

export default EditQuestion;