import React,{useState,useEffect} from 'react';
import {Nav} from 'react-bootstrap';
import UserReputationHistory from './UserReputationHistory.js';
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/reputationlist.css";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import {axiosInstance as authapi} from '../../services/authaxiosservice';

const GET_USER_REPUTATION_API = "api/user/reputation/history/";

const UserReputationList = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const {userId} = new useParams(search);
    const [userReputationHistory, setUserReputationHistory] = useState([]);
    const [gettingUserReputationHistory,setGettingUserReputationHistory] = useState(true);

    const getUserReputationHistory = async () => {
      setGettingUserReputationHistory(true);
      try{
          const response = await authapi.get(GET_USER_REPUTATION_API+userId);
          if(response && response.data && response.data.success && response.data.reputationHistory){
              console.log(response.data.reputationHistory);
              setGettingUserReputationHistory(false);
              setUserReputationHistory(response.data.reputationHistory);
          }else{
              setGettingUserReputationHistory(false);
          }
      }catch(e){
          console.log(e);
          setGettingUserReputationHistory(false);
      }
    }

    useEffect(() => {
        getUserReputationHistory();
  },[]);

  return (
      <div>
        <div className="usertaglist-count">{userReputationHistory && userReputationHistory.length && userReputationHistory[0].user.reputation} Reputation</div>
        {/* <div className="usertaglist-tab">
            <Nav variant="tabs" defaultActiveKey="/score">
                <Nav.Item>
                    <Nav.Link eventKey="/score">Post</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/time">Time</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/graph">Graph</Nav.Link>
                </Nav.Item>
            </Nav>
        </div> */}
        {
            userReputationHistory && userReputationHistory.map((eachReputationHistory) =>{
                return <UserReputationHistory key={eachReputationHistory._id} eachReputationHistory={eachReputationHistory}/>
            })
        }
      </div>
  )
}

export default UserReputationList