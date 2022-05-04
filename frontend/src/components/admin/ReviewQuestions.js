import React, { useEffect, useState } from "react";
import axiosApi from "../../config/axios.config";
import { constants } from "../../config/config";
import "./ReviewQuestions.css";

const ReviewQuestions = () => {
  const [questions, setQuestions] = useState();

  const handleButtonClick = (value, idx) =>{
    console.log(value, idx);
    let data = { "questionID": questions[idx]._id, "status": value};
    axiosApi.post(constants.API.baseURL+constants.API.ADMIN.approval, data).then(res=>{
        console.log(res);
        if(res && res.data && res.data.success==true){
            let updatedQuestions = questions;
            updatedQuestions[idx].status = res.data.result.status;
            setQuestions([...updatedQuestions]);
        }
    }, err=>{console.log(err)})

  }

  const getQuestions = () => {
    axiosApi
      .get(constants.API.baseURL + constants.API.ADMIN.getUnreviewed)
      .then((res) => {
        //  console.log(res);
        if (res && res.data && res.data.success == true) {
          let response = res.data.result;
          //  console.log(response);
          setQuestions(response);
          console.log(questions);
        }
      });
  };
  useEffect(getQuestions, []);

  return (
    <div>
      <div id="questions" class="">
        {questions && questions.length>0 &&
          questions.map((question, idx) => <QuestionSummary idx={idx} question={question} handleButtonClick={handleButtonClick} />)}
        {(typeof(questions)=="undefined" || questions?.length<=0) &&
        <div>
          <h2>No Questions to review</h2>
          </div>  }
      </div>
    </div>
  );
};

const QuestionSummary = ({idx, question, handleButtonClick}) => (
  <div id="question-summary" class="s-post-summary js-post-summary">
    {console.log("IN QUESTION", question)}
    <div class="s-post-summary--content ">
      <h3 class="s-post-summary--content-title">
        <a href="{questionOverviewLink}" class="s-link">
          {question.title}
        </a>
      </h3>
      <div class="s-post-summary--content-excerpt">
        {question.description}
      </div>
      <div class="s-post-summary--meta">
        {question.tags &&
          question.tags.map((tag, idx) => <Tags tag={tag} />)}
        <div class="s-user-card s-user-card__minimal">
          <time class="s-user-card--time">
            asked{" "}
            <span title="2022-04-29 22:54:18Z" class="relativetime">
              {question.created}
            </span>{" "}
            &ensp;
          </time>
          <div class="dropdown">
            <button value={constants.constants.questionApproved} onClick={(e)=>{handleButtonClick(e.target.value, idx)}} class="s-btn s-btn__primary" type="button" disabled={question.status!="waiting for approval"?true:false}>Accept</button>
            &ensp;&ensp;
            <button value={constants.constants.questionRejected} onClick={(e)=>{handleButtonClick(e.target.value, idx)}} class="s-btn s-btn__danger s-btn__filled" type="button" disabled={question.status!="waiting for approval"?true:false}>Reject</button>            
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Tags = ({tag}) => (
  <div class="s-post-summary--meta-tags tags js-tags t-reactjs t-setinterval t-use-effect t-codepen">
    <a href="/questions/tagged/reactjs" class="s-tag">
      {tag}
    </a>{" "}
  </div>
);

const User = (user) => (
  <div>
    <a
      href="/users/18166560/steve-kim"
      class="s-avatar s-avatar__16 s-user-card--avatar"
    >
      {" "}
      <div class="gravatar-wrapper-16" data-user-id="18166560">
        <img
          src="https://lh3.googleusercontent.com/a-/AOh14GhG_c6hhzsFw0FxHRnMIiIvgtqHa-aV8FsIWmxv=k-s32"
          alt="user avatar"
          width="16"
          height="16"
          class="s-avatar--image"
        />
      </div>
    </a>

    <div class="s-user-card--info">
      <div class="s-user-card--link d-flex gs4">
        <a href="/users/18166560/steve-kim" class="flex--item">
          Steve Kim
        </a>
      </div>

      <ul class="s-user-card--awards">
        <li class="s-user-card--rep">
          <span class="todo-no-class-here" title="reputation score " dir="ltr">
            21
          </span>
        </li>
      </ul>
    </div>
  </div>
);
export default ReviewQuestions;
