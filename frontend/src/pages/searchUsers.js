import { Row, Col } from "react-bootstrap";
import CompactUserListing from "../components/user/CompactUserListing";
import Navbar from "../components/user/Navbar";

function Question() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <br />
        <div>
          <h1>Headers</h1>
        </div>
        <Row>
          <Col style={{ "text-align": "-webkit-center" }}>
            <CompactUserListing />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Question;
