import React, { useEffect, useState } from "react";
import axiosApi from "../../config/axios.config";
import { constants } from "../../config/config";
import "./Analytics.css";

const Analytics = () => {
  const [HighestReputedUsers, setHighestReputedUsers] = useState();
  const [LowestReputedUsers, setLowestReputedUsers] = useState();
  const [MostUsedTags, setMostUsedTags] = useState();
  const [MostViewedQuestions, setMostViewedQuestions] = useState();
  const [TodaysQuestions, setTodaysQuestions] = useState();

  const getAnalytics = () => {
    axiosApi.get(constants.API.ADMIN.getAnalytics).then(
      (res) => {
        console.log(res);
        if (res && res.data && res.data.success == true) {
          setHighestReputedUsers(res.data.HighestReputedUsers);
          setLowestReputedUsers(res.data.LowestReputedUsers);
          setMostUsedTags(res.data.MostUsedTags);
          setMostViewedQuestions(res.data.MostViewedQuestions);
          setTodaysQuestions(res.data.TodaysQuestions);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(getAnalytics, []);
  return (
    <div id="questions">
      
      <div class="" style={{marginBottom: "20px"}}>
        <h2>Most Viewed Questions</h2>
        {MostViewedQuestions &&
          MostViewedQuestions.map((question, idx) => (
            <QuestionSummary idx={idx} question={question} />
          ))}
      </div>
      
      <div class="bottom">
        <div >
          <h2>Most Used Tags:</h2>
          <div class="tags" style={{paddingBottom: "40px"}}>
            {MostUsedTags && MostUsedTags.map((tag, idx) => <Tags tag={tag} />)}
          </div>
          
          <div class="tags" style={{paddingBottom: "240px"}}>
          <h2>Todays Questions: {TodaysQuestions}</h2>&ensp;
        </div>
        </div>
        
        
        <div>
          <h2>Highest Reputed Users:</h2>&ensp;
          {HighestReputedUsers &&
            HighestReputedUsers.map((user, idx) => <User user={user} />)}
        </div>
        <div>
          <h2>Lowest Reputed Users:</h2>&ensp;
          {LowestReputedUsers &&
            LowestReputedUsers.map((user, idx) => <User user={user} />)}
        </div>
      </div>
      
    </div>
  );
};

const QuestionSummary = ({ idx, question, handleButtonClick }) => (
  <div id="question-summary" class="s-post-summary js-post-summary">
    {console.log("IN QUESTION", question)}
    <div class="s-post-summary--content ">
      <h3 class="s-post-summary--content-title">
        <a href={"/question/"+question._id} class="s-link">
          {question.title}
        </a>
      </h3>
      <div class="s-post-summary--content-excerpt">{question.description}</div>
      <div class="s-post-summary--meta">
        {question.tags && question.tags.map((tag, idx) => <Tags tag={tag} />)}
        <div class="s-user-card s-user-card__minimal">
          <time class="s-user-card--time">
            asked{" "}
            <span title="2022-04-29 22:54:18Z" class="relativetime">
              {question.createdAt}
            </span>{" "}
            &ensp;
          </time>
        </div>
      </div>
    </div>
  </div>
);

const Tags = ({ tag }) => (
  <div class="s-post-summary--meta-tags tags js-tags t-reactjs t-setinterval t-use-effect t-codepen">
    <a href="/questions/tagged/reactjs" class="s-tag">
      {tag.name ? tag.name : tag}
    </a>{" "}
  </div>
);

const User = ({ user }) => (
  <div class="s-user-card s-user-card__full">
    {console.log("IN USER", user)}
    <a href="…" class="s-avatar s-avatar__48 s-user-card--avatar">
      {" "}
      {user.name}
      <img class="s-avatar--image" src={user.profilePic} />
    </a>
    <div class="s-user-card--info">
      {/* <a href="#" class="s-user-card--link d-flex g4">
            <div class="flex--item">…</div>
            <div class="flex--item s-badge s-badge__new s-badge__xs">…</div>
        </a> */}
      <ul class="s-user-card--awards">
        {user.badge == "NEW" && (
          <li class="s-badge s-badge__sm s-badge__gold">NEW</li>
        )}
        {user.badge === "GOLD" && (
          <li class="s-award-bling s-award-bling__gold"></li>
        )}
        {user.badge === "SILVER" && (
          <li class="s-award-bling s-award-bling__silver"></li>
        )}
        {user.badge === "BRONZE" && (
          <li class="s-award-bling s-award-bling__bronze"></li>
        )}
      </ul>
      {/* <ul class="s-user-card--awards">
            <li class="s-user-card--rep">…</li>
            {user.badges.contains("NEW") && <li class="s-award-bling s-award-bling__gold">NEW</li>}
            {user.badges.contains("GOLD") && <li class="s-award-bling s-award-bling__gold"></li>}
            {user.badges.contains("SILVER") && <li class="s-award-bling s-award-bling__silver"></li>}
            {user.badges.contains("BRONZE") && <li class="s-award-bling s-award-bling__bronze"></li>}
        </ul> */}
      <div class="s-user-card--location">{user.location}</div>
    </div>
  </div>
);
export default Analytics;
