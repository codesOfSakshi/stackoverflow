import { Row,Col } from 'react-bootstrap';
import QuestionsPage from '../components/questions/QuestionDisplay';
import { useParams } from 'react-router-dom';
import Navbar from "../components/user/Navbar";
import SideNav from "../Atom/SideNav.jsx"

function QuestionDisplay(props) {
  const params = useParams();
  return (
    <>
    <Navbar></Navbar>
    <div style={{marginTop:"5rem"}}>
        <Row>
        <Col lg={3}>
        <SideNav/>
        </Col>
        <Col>
            <QuestionsPage id = {params.id}></QuestionsPage>
        </Col>
        </Row>
    </div>
    </>
  );
}

export default QuestionDisplay;