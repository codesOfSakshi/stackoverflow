import { Row,Col } from 'react-bootstrap';
import AskQuestionEditor from '../components/questions/AskQuestionEditor';
import Navbar from "../components/user/Navbar";
import SideNav from "../Atom/SideNav.jsx"

function AskQuestion() {
  return (
    <div>
    <Navbar></Navbar>
    <Row style={{marginTop:"5rem"}}>
        <Col lg={3}>
        <SideNav/>
        </Col>
      <Col lg={9}>
    <img src="https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368" 
        style={{"float": "right","height": "130px"}}>
        </img>
    <div className="fs-headline1" style={{"paddingTop":"3rem"}}>Ask a public question</div>
    {/* </Col>
    </Row>
    <Row>
        <Col lg={3}>
        </Col>
      <Col> */}
    <div>
    <br></br>
    <br></br>
    <AskQuestionEditor></AskQuestionEditor>
    </div>
        </Col>
    </Row>
    </div>
  );
}

export default AskQuestion;