import { Row,Col } from 'react-bootstrap';
import QuestionsPage from '../components/questions/QuestionDisplay';
import { useParams } from 'react-router-dom';

function QuestionDisplay(props) {
  const params = useParams();
  return (
    <>
    <div>
            <div><h1>Headers</h1></div>
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