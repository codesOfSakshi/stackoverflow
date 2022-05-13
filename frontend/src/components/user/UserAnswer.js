
import * as React from 'react';


export default function UserAnswer({answer}) {
   console.log(answer)
    return (
        answer.map(ans=> {


          return  <div id="question-summary-61933462" className="s-post-summary s-post-summary__minimal js-post-summary"
                 data-post-id="61933462" data-post-type-id="1">
                <div className="s-post-summary--stats js-post-summary-stats">


                    <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized"
                         title="Score of 1">
                        <span className="s-post-summary--stats-item-number">{ans.score}</span>
                        <span className="s-post-summary--stats-item-unit">vote</span>
                    </div>


                </div>
                <div className="s-post-summary--content">

                    <h3 className="s-post-summary--content-title">


                        <a href={"/question/"+ans._id} className="s-link">{ans.title}</a>
                    </h3>
                    <div className="s-post-summary--meta">
                        { (ans.tags).map(tag=>{

                            return (<span key={tag} style={{display:"inline",marginRight:"10px"}} className="s-post-summary--meta">
                        <a className="flex--item s-tag" href={"/tag/"+tag}>{tag}</a>
                    </span>)
                        })}

                        <div className="s-user-card s-user-card__minimal">


                            <div className="s-user-card--info">
                                <div className="s-user-card--link d-flex gs4">

                                </div>


                            </div>

                            <time className="s-user-card--time">asked <span title="2020-05-21 11:26:53Z"
                                                                            className="relativetime">{ans.createdAt}</span>
                            </time>
                        </div>

                    </div>
                </div>
            </div>
        })

    );
}
