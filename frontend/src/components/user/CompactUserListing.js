// import { Form, Row, Col, Card, Button } from "react-bootstrap";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import CompactQuestion from "../../Atom/CompactQuestion";
// import { useNavigate } from "react-router-dom";
// import { constants } from "../../config/config";

// function CompactUserListing(props) {
//   let navigate = useNavigate();
//   const routeQuestion = () => {
//     // TODO naviagate to the user profile page
//     // navigate(`/askquestion`);
//   };
//   const SEARCHURL = `http://${constants.IP.ipAddress}:${constants.IP.port}/api/search/name`;
//   const [users, setUsers] = useState();
//   const [searchString, setsearchString] = useState("");

//   useEffect(() => {
//     let data = {
//       name: "",
//     };
//     axios.post(api, data).then((response) => {
//       console.log(response.data.users);
//       setUsers(response.data.users);
//     });
//   }, []);

//   const repopulate = (e, num) => {
//     e.preventDefault();
//     var api = "http://localhost:3001/api" + "/questions";
//     var payload = {
//       sortType: 1,
//       type: num,
//     };
//     axios.post(api, payload).then((response) => {
//       console.log(response.data.data);
//       setlmain(response.data.data);
//     });
//   };

//   return (
//     <div>
//       <div style={{ width: "60rem", textAlign: "left" }}>
//         <h2>
//           All Questions{" "}
//           <Button onClick={routeQuestion} style={{ float: "right" }}>
//             Ask Question
//           </Button>
//         </h2>
//         <br></br>
//         <Row>
//           <Col>
//             <h4>{questionsAll.length} questions</h4>
//           </Col>
//           <Col>
//             <div className="s-btn-group" style={{ float: "right" }}>
//               <button
//                 className="s-btn s-btn__muted s-btn__outlined"
//                 role="button"
//                 onClick={(e) => repopulate(e, 1)}
//               >
//                 Interesting
//               </button>
//               <button
//                 className="s-btn s-btn__muted s-btn__outlined"
//                 role="button"
//                 onClick={(e) => repopulate(e, 2)}
//               >
//                 Hot
//               </button>
//               <button
//                 className="s-btn s-btn__muted s-btn__outlined"
//                 role="button"
//                 onClick={(e) => repopulate(e, 3)}
//               >
//                 Scored
//               </button>
//               <button
//                 className="s-btn s-btn__muted s-btn__outlined"
//                 role="button"
//                 onClick={(e) => repopulate(e, 4)}
//               >
//                 Unanswered
//               </button>
//             </div>
//           </Col>
//         </Row>
//         {questionsAll.map((question) => (
//           <>
//             <hr></hr>
//             <CompactQuestion questions={question}></CompactQuestion>
//           </>
//         ))}
//         {/* <PaginatedList
//             list={questionsAll}
//             itemsPerPage={10}
//             renderList={(list) => (list.map(question =>(<><hr></hr><CompactQuestion questions={question}></CompactQuestion></>)))}
//             ></PaginatedList> */}
//       </div>
//     </div>
//   );
// }

// export default CompactUserListing;
