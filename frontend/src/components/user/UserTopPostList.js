import React, {useEffect, useState} from 'react'
import UserTopPost from './UserTopPost'
import axiosService from "../../services/axiosservice";
import {useParams} from "react-router-dom";
function UserTopPostList({userId}) {

    const [question, setQuestion] = useState([]);
    const GET_USER_POSTS_API = "api/user/top-posts/"+userId;
    const params = useParams();
    const [posts,setPosts] = useState([]);
    const [gettingPosts,setGettingPosts] = useState(true);

      const getUserPosts = async () => {
      setGettingPosts(true);
      try{
          const response = await axiosService.get(GET_USER_POSTS_API);
          if(response && response.data && response.data.success){
              console.log(response.data);
              setPosts(response.data);
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


    return (

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
                        <a className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-selected is-selected js-post-filter-btn">All</a>
                        <a data-type="1"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-filter-btn">Questions</a>
                        <a data-type="2"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-filter-btn">Answers</a>
                        <a data-type="9"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-filter-btn">Articles</a>
                    </div>
                    <div className="s-btn-group ml8 js-post-sorts">
                        <a data-sort="Votes"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-selected is-selected js-post-sort-btn">Score</a>
                        <a data-sort="Newest"
                           className="s-btn s-btn__muted s-btn__outlined s-btn__xs js-post-sort-btn">Newest</a>
                    </div>
                </div>
            </div>


            {
            !gettingPosts && posts && posts.map((eachPost)=>{
                return (
                    <div>
                        <UserTopPost key={eachPost._id} post={eachPost}/>
                    </div>
                )
            })
        }

        </div>
    )
}

export default UserTopPostList;


