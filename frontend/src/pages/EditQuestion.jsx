import { Row,Col } from 'react-bootstrap';
import EditQuestionPage from '../components/questions/EditQuestionPage';
import Navbar from "../components/user/Navbar";
import SideNav from "../Atom/SideNav.jsx"

function EditQuestion() {
return (
    <>
    <Navbar></Navbar>
    <Row style={{marginTop:"5rem"}}>
        <Col lg={3}>
        <SideNav/>
        </Col>
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