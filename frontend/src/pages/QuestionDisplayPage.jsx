import { Row,Col } from 'react-bootstrap';
import QuestionsPage from '../components/questions/QuestionDisplay';
import { useParams } from 'react-router-dom';
import Navbar from "../components/user/Navbar";

function QuestionDisplay(props) {
  const params = useParams();
  return (
    <>
    <Navbar></Navbar>
    <div style={{marginTop:"5rem"}}>
        <Row>
        <Col style={{"text-align": "-webkit-center"}}>
            <QuestionsPage id = {params.id}></QuestionsPage>
        </Col>
        </Row>
    </div>
    </>
  );
}

export default QuestionDisplay;