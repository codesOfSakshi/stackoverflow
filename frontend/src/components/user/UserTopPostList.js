import React, {useEffect, useState} from 'react'
import UserTopPost from './UserTopPost'
import axiosService from "../../services/axiosservice";
import {useParams} from "react-router-dom";
import "../../styles/usertoppostlist.css";
import {axiosInstance as authapi} from '../../services/authaxiosservice';

function UserTopPostList({userId}) {

     const [question, setQuestion] = useState([]);
     const GET_USER_POSTS_API = "api/user/top-posts/"+userId;
     const params = useParams();
     const [topPosts,setTopPosts] = useState([]);
     const [gettingPosts,setGettingPosts] = useState(true);
     const [rankby,setRankBy] = useState("score");
     const [type, setType] = useState("all");

      const getUserPosts = async () => {
      setGettingPosts(true);
      setGettingPosts(true);
      try{

          const response = await authapi.get(GET_USER_POSTS_API, {params:{rankby: rankby, type: type}});
          if(response && response.data && response.data.success){
              setTopPosts(response.data.data);
              console.log(topPosts,'a')
              setGettingPosts(false);
          }else{
              setGettingPosts(false);
          }
      }catch(e){
          console.log(e);
          setGettingPosts(false);
      }
    }

      useEffect(() => {
        getUserPosts();
      },[]);

        const updateRankBy = (rankBy)=>{
            setRankBy(rankBy)
            setRankBy(rankBy)
            console.log(rankby)
            getUserPosts();
        }
        const updateType = (type)=>{
            setType(type)
            setType(type)
            console.log(type)
            getUserPosts();
        }


    return (
        <div className="usertoppostlist-container">
            <div className="usertaglist-title">
        <div id="js-top-posts" className="grid--item">
            <div className="d-flex ai-end jc-space-between fw-wrap">
                <div className="flex--item mb8">
                    <div className="fs-title">
                        Top posts
                    </div>
                    <div className="fc-light s-anchors">
                        View all <a href="/users/6599710/sam?tab=questions" data-gps-track="profile_link.click({target:3, type:1 })" className="js-gps-track">questions</a>, <a href="/users/6599710/sam?tab=answers"
                                                                               data-gps-track="profile_link.click({target:3, type:1 })"
                                                                               className="js-gps-track">answers</a>,
                        and <a href="/users/6599710/sam?tab=articles"
                               data-gps-track="profile_link.click({target:3, type:1 })"
                               className="js-gps-track">articles</a></div>
                </div>

                <div className="d-flex jc-end mb8">
                    <div className="s-btn-group js-post-filters">
                        <a className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-selected is-selected js-post-filter-btn" onClick={() => updateType("all")}>All</a>
                        <a data-type="1"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-filter-btn" onClick={() => updateType("question")}>Questions</a>
                        <a data-type="2"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-filter-btn" onClick={() => updateType("answer")}>Answers</a>
                        <a data-type="9"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-filter-btn" onClick={() => updateType("all")}>Articles</a>
                    </div>
                    <div className="s-btn-group ml8 js-post-sorts">
                        <a data-sort="Votes"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-selected is-selected js-post-sort-btn" onClick={() => updateRankBy("score")}>Score</a>
                        <a data-sort="Newest"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-sort-btn" onClick={() => updateRankBy("date")}>Newest</a>
                    </div>
                </div>
            </div>


            {

            !gettingPosts && topPosts && topPosts.map((eachPost)=>{

                return (
                    <div>
                        <UserTopPost key={eachPost._id} post={eachPost}/>
                    </div>
                )
            })
        }

        </div>

            </div>
        </div>
    )
}

export default UserTopPostList;


