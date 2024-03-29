
import * as React from 'react';
import Stack from '@mui/material/Stack';
import ReactTimeAgo from "react-time-ago";


export default function UserQuestion({question}) {

    return (
     question.map(que=>{
      return  <div id="question-summary-61933462" className="s-post-summary s-post-summary__minimal js-post-summary"
             data-post-id="61933462" data-post-type-id="1">
            <div className="s-post-summary--stats js-post-summary-stats">


                <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized"
                     title="Score of 1">
                    <span className="s-post-summary--stats-item-number">{que.score}</span>
                    <span className="s-post-summary--stats-item-unit">vote</span>
                </div>
                {que.best===false&&
                <div className="s-post-summary--stats-item has-answers " title="1 answer">

                    <span className="s-post-summary--stats-item-number">{que.answers.length}</span>
                    <span className="s-post-summary--stats-item-unit">answer</span>
                </div>}
                {que.best===true&&
                    <div className="s-post-summary--stats-item has-answers has-accepted-answer"
                         title="one of the answers was accepted as the correct answer">
                        <svg aria-hidden="true" className="svg-icon iconCheckmarkSm" width="14" height="14"
                             viewBox="0 0 14 14">
                            <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
                        </svg>
                        <span className="s-post-summary--stats-item-number">{que.answers.length}</span>
                        <span className="s-post-summary--stats-item-unit">answers</span>
                    </div>
                }
                <div className="s-post-summary--stats-item " title="297 views">
                    <span className="s-post-summary--stats-item-number">{que.views}</span>
                    <span className="s-post-summary--stats-item-unit">views</span>
                </div>


            </div>
            <div className="s-post-summary--content">

                <h3 className="s-post-summary--content-title">


                    <a href={"/question/"+que._id} className="s-link">{que.title}</a>
                </h3>
                <div className="s-post-summary--meta">
                    <div className="s-post-summary--meta-tags tags js-tags t-spring t-caching t-aerospike">
                        {(que.tags).map(tag=>{
                            return (<span key={tag} style={{display:"inline",marginRight:"10px"}} className="s-post-summary--meta">
                        <a className="flex--item s-tag" href={"/tag/"+tag}>{tag}</a>
                    </span>)
                    })}
                    </div>


                    <div className="s-user-card s-user-card__minimal">


                        <div className="s-user-card--info">
                            <div className="s-user-card--link d-flex gs4">

                            </div>


                        </div>

                        <time className="s-user-card--time">
                        <span className="relativetime">
                            <ReactTimeAgo date={Date.parse(que?.createdAt)} locale="en-US" />
                        </span>
                        </time>
                    </div>

                </div>
            </div>
        </div>
     })

    );
}
