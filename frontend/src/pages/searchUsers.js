   
import { Row, Col, Button } from "react-bootstrap";
import CompactUserListing from "../components/user/CompactUserListing";
import Navbar from "../components/user/Navbar";
import UsersSearchBar from "../Atom/UsersSearchBar";
import { constants } from "../config/config";
import axios from "axios";
import React, { useState } from "react";
import SideNav from "../Atom/SideNav.jsx"

function SearchUsers() {
  /* --------------------------- constants/variables -------------------------- */
  const SEARCHURL = `http://${constants.IP.ipAddress}:${constants.IP.port}/api/search/name`;
  const [searchString, setsearchString] = useState("");
  const [users, setUsers] = useState([]);
  /* ---------------------------- search functions ---------------------------- */
  let handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchString.length >= 3 || searchString.length == 0) {
        searchFunction();
      }
    }
  };

  let searchChangehandler = (e) => {
    e.preventDefault();
    setsearchString(e.target.value);
  };

  let searchFunction = async () => {
    const data = {
      name: searchString,
    };
    console.log("the final data is", data);
    axios
      .post(SEARCHURL, data)
      .then((response) => {
        if (response.status === 200) {
          const temp_users = response.data.users;
          console.log(
            "the users recieved from searching are.......",
            temp_users
          );
          setUsers(temp_users);
        } else if (response.data.code === 500) {
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(
          "error in getting all items in the search input field in navbar and the error is",
          err
        );
      });
  };

  /* ----------------------- props for child components ----------------------- */

  const searchProps = {
    searchString,
    searchChangehandler,
    handleKeyPress,
  };

  const compactUserProps = {
    users,
    setUsers,
  };
  /* ------------------------------ returning jsx ----------------------------- */
  return (
    <>
      <div>
        <Navbar />
      </div>
        <div style={{ marginTop: "60px" }}>
        <Row style={{ textAlign: "-webkit-center",marginTop: "3rem" }}>
          <Col lg={3}><SideNav></SideNav></Col>
          <Col>
            <Row>
              <UsersSearchBar {...searchProps} />
            </Row>
            <Row>
              <CompactUserListing {...compactUserProps} />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SearchUsers;
