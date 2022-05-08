import { Row,Col } from 'react-bootstrap';
import CompactQuestionListing from '../components/questions/CompactQuestionListing';
import { useLocation } from "react-router-dom";

function Question() {
  const location = useLocation();
  let props={};
  if(location.state && location.state.searchResult){
    props.searchResult = true;
    props.questions = location.state.questions;
  } else{
    props.searchResult = false;
  }
  return (
    <>
    <div>
            <div><h1>Headers</h1></div>
        <Row>
        <Col style={{"text-align": "-webkit-center"}}>
            <CompactQuestionListing {...props} />
        </Col>
        </Row>
    </div>
    </>
  );
}

export default Question;