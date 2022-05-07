import { Row,Col } from 'react-bootstrap';
import QuestionsPage from '../components/questions/QuestionDisplay';
import Navbar from "../components/user/Navbar";

function QuestionDisplay() {
  return (
    <>
    <Navbar></Navbar>
    <div style={{marginTop:"5rem"}}>
        <Row>
        <Col style={{"text-align": "-webkit-center"}}>
            <QuestionsPage></QuestionsPage>
        </Col>
        </Row>
    </div>
    </>
  );
}

export default QuestionDisplay;