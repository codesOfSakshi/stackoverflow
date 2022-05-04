import { Row,Col } from 'react-bootstrap';
import CompactQuestionListing from '../components/questions/CompactQuestionListing';

function Question() {
  return (
    <>
    <div>
            <div><h1>Headers</h1></div>
        <Row>
        <Col style={{"text-align": "-webkit-center"}}>
            <CompactQuestionListing></CompactQuestionListing>
        </Col>
        </Row>
    </div>
    </>
  );
}

export default Question;