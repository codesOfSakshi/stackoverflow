import { Row,Col } from 'react-bootstrap';
import CompactQuestionListing from '../components/questions/CompactQuestionListing';
import { useLocation } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import SideNav from "../Atom/SideNav.jsx"

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
    <Navbar></Navbar>
    <Row style={{marginTop:"5rem"}}>
        <Col lg={3}>
        <SideNav/>
        </Col>
        <Col>
            <CompactQuestionListing {...props} />
        </Col>
        </Row>
    </div>
    </>
  );
}

export default Question;