import React,{useState,useEffect} from 'react';
import UserBookmark from "./UserBookmark";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import {axiosInstance as authapi} from '../../services/authaxiosservice';

const GET_USER_BOOKMARKS_API = "api/user/bookmark/";

function UserBookmarkList({bookmarkQuestions}) {

    const navigate = useNavigate();
    const search = useLocation().search;
    const {userId} = new useParams(search);
    const [bookMarkQuestions, setBookMarkQuestions] = useState([]);
    const [gettingUserBookMarks,setGettingUserBookMarks] = useState(true);

     const getUserBookMarks = async () => {
      setGettingUserBookMarks(true);
      try{
          const response = await authapi.get(GET_USER_BOOKMARKS_API+userId);
          if(response && response.data ){
              console.log(response.data.data);
              setGettingUserBookMarks(false);
              setBookMarkQuestions(response.data.data);
          }else{
              setGettingUserBookMarks(false);
          }
      }catch(e){
          console.log(e);
          setGettingUserBookMarks(false);
      }
  }

  useEffect(() => {
    getUserBookMarks();
  },[]);

    return (

            <div className="ba bc-black-100 bar-md">
                {!gettingUserBookMarks && bookMarkQuestions && bookMarkQuestions.map((bookMarkQuestion) =>{
                    return  <UserBookmark key={bookMarkQuestion._id} bookMarkQuestion={bookMarkQuestion}/>;
                })}

            </div>


    );
}

export default UserBookmarkList;