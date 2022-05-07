import { Row,Col } from 'react-bootstrap';
import QuestionsPage from '../components/questions/QuestionDisplay';

function QuestionDisplay() {
  return (
    <>
    <div>
            <div><h1>Headers</h1></div>
        <Row>
        <Col style={{"textAlign": "-webkit-center"}}>
            <QuestionsPage></QuestionsPage>
        </Col>
        </Row>
    </div>
    </>
  );
}

export default QuestionDisplay;