import React,{useState, useEffect} from 'react';
import UserStats from './UserStats.js';
import UserBadgeInfo from './UserBadgeInfo.js';
import UserTagList from './UserTagList.js';
import "../../styles/profiletab.css";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import axiosService from '../../services/axiosservice';

const GET_USER_API = "api/user/";

const ProfileTab = () => {
  const navigate = useNavigate();
  const search = useLocation().search;
  const {userId} = new useParams(search);
  const [reputation,setReputation] = useState(0);
  const [reach,setReach] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  const [gettingUser,setGettingUser] = useState(true);

  const getUser = async () => {
      setGettingUser(true);
      try{
          const response = await axiosService.get(GET_USER_API+userId);
          if(response && response.data && response.data.success && response.data.user){
              setReputation(response.data.user.reputation);
              setReach(response.data.user.reach);
              console.log(response.data.user);
              if(response.data.user.answers){
                setAnswerCount(response.data.user.answers.length);
              }
              if(response.data.user.questions){
                setQuestionCount(response.data.user.questions.length);
              }
              setGettingUser(false);
          }else{
              setGettingUser(false);
          }
      }catch(e){
          console.log(e);
          setGettingUser(false);
      }
  }

  useEffect(() => {
    getUser();
  },[]);


  return (
      <div className="profiletab-container">
        <UserStats reach={reach} reputation={reputation} answerCount={answerCount} questionCount={questionCount}/>
        <UserBadgeInfo/>
        <UserTagList/>
      </div>
  )
}

export default ProfileTab