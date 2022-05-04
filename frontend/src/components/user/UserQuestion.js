
import * as React from 'react';
import Stack from '@mui/material/Stack';


export default function UserQuestion({question}) {

    return (
     question.map(que=>{
        <div id="question-summary-61933462" className="s-post-summary s-post-summary__minimal js-post-summary"
             data-post-id="61933462" data-post-type-id="1">
            <div className="s-post-summary--stats js-post-summary-stats">


                <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized"
                     title="Score of 1">
                    <span className="s-post-summary--stats-item-number">{que.upVotesCount.length-que.downVotesCount.length}</span>
                    <span className="s-post-summary--stats-item-unit">vote</span>
                </div>
                <div className="s-post-summary--stats-item has-answers " title="1 answer">
                    <span className="s-post-summary--stats-item-number">{que.answers.length}</span>
                    <span className="s-post-summary--stats-item-unit">answer</span>
                </div>
                <div className="s-post-summary--stats-item " title="297 views">
                    <span className="s-post-summary--stats-item-number">{que.views}</span>
                    <span className="s-post-summary--stats-item-unit">views</span>
                </div>


            </div>
            <div className="s-post-summary--content">

                <h3 className="s-post-summary--content-title">


                    <a href="/questions/61933462/aerospike-as-cache" className="s-link">Aerospike as cache</a>
                </h3>
                <div className="s-post-summary--meta">
                    <div className="s-post-summary--meta-tags tags js-tags t-spring t-caching t-aerospike">
                        (que.tags).map(tag=>{
                        <a href="/questions/tagged/spring" className="post-tag flex--item mt0 js-tagname-spring"
                           title="" rel="tag">{tag.title}</a>
                    })
                    </div>


                    <div className="s-user-card s-user-card__minimal">


                        <div className="s-user-card--info">
                            <div className="s-user-card--link d-flex gs4">

                            </div>


                        </div>

                        <time className="s-user-card--time">asked <span title="2020-05-21 11:26:53Z"
                                                                        className="relativetime">May 21, 2020 at 11:26</span>
                        </time>
                    </div>

                </div>
            </div>
        </div>
     })

    );
}
