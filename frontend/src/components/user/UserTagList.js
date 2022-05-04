import React,{useState,useEffect} from 'react';
import UserTag from './UserTag.js';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "../../styles/usertaglist.css";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import axiosService from '../../services/axiosservice';

const GET_USER_TAGS_API = "api/user/tags/";

const UserTagList = () => {

  const navigate = useNavigate();
  const search = useLocation().search;
  const {userId} = new useParams(search);
  const [tags,setTags] = useState([]);
  const [gettingTags,setGettingTags] = useState(true);

  const getUserTags = async () => {
      setGettingTags(true);
      try{
          const response = await axiosService.get(GET_USER_TAGS_API+userId);
          if(response && response.data && response.data.success && response.data.tags){
              console.log(response.data.tags);
              setTags(response.data.tags);
              setGettingTags(false);
          }else{
              setGettingTags(false);
          }
      }catch(e){
          console.log(e);
          setGettingTags(false);
      }
  }

  useEffect(() => {
    getUserTags();
  },[]);


  return (
    <div className="profiletab-item-usertaglist-container usertaglist-container">
        <div className="usertaglist-title">
            Top Tags
        </div>
        {/* <div>
            <div className="usertaglist-count">621 Tags</div>
            <div className="usertaglist-tab">
                <Nav variant="tabs" defaultActiveKey="/score">
                    <Nav.Item>
                        <Nav.Link eventKey="/score">Score</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/name">Name</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div> */}
        {
            !gettingTags && tags && tags.map((eachTag)=>{
                return (
                    <div>
                        <UserTag key={eachTag._id} name={eachTag.name} score={eachTag.score} color={eachTag.color} posts={eachTag.posts}></UserTag>
                    </div>
                )
            })
        }
    </div>
  )
}

export default UserTagList