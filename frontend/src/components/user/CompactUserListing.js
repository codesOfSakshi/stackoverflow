   
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import CompactQuestion from "../../Atom/CompactQuestion";
import { useNavigate } from "react-router-dom";
import { constants } from "../../config/config";
import CompactUser from "../../Atom/CompactUser";

function CompactUserListing() {
  let navigate = useNavigate();
const [users, setUsers] = useState("");
  const routeQuestion = () => {
    // TODO naviagate to the user profile page
    // navigate(`/askquestion`);
  };
  const SEARCHURL = `http://${constants.IP.ipAddress}:${constants.IP.port}/api/search/name`;

  //   const [searchString, setsearchString] = useState("");

  useEffect(() => {
    let data = {
      name: "",
    };
    axios.post(SEARCHURL, data).then((response) => {
      console.log(response.data.users);
      setUsers(response.data.users);
    });
  }, []);

  return (
    <div style={{ width: "60rem", textAlign: "left" }}>
      <Row xs={1} md={2} lg={4} className="g-4">
        {users && users.map((user) => (
          <div className="flex--item" key={user._id}>
            {/* <hr></hr> */}
            <Col>
              <CompactUser {...user} />
            </Col>
          </div>
        ))}
      </Row>
    </div>
  );
}

export default CompactUserListing;