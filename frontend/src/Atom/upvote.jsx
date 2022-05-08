import React, { useEffect, useState } from "react";

const Upvote = ({ type, object, upVote, downVote, addBookmark }) => {

    return (
        <div>
            {object &&
            
                <div style={{ "color": "#babfc4" }}>
                    {console.log(object)}
                    <button class="js-vote-up-btn flex--item s-btn s-btn__unset c-pointer " data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Up vote" data-selected-classes="fc-theme-primary" data-unselected-classes="" aria-describedby="--stacks-s-tooltip-rk2wmyoh" onClick={upVote}>
                        <svg aria-hidden="true" class="svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
                    </button>
                    <div id="--stacks-s-tooltip-rk2wmyoh" class="s-popover s-popover__tooltip pe-none" aria-hidden="true" role="tooltip" >This answer is useful<div class="s-popover--arrow" ></div>
                    </div>
                    <div class="js-vote-count flex--item d-flex fd-column fc-black-500 fs-title" itemprop="upvoteCount" data-value="1874">
                        &ensp;{object.upVotes?.length || object.upvotes?.length || 0}
                    </div>
                    <button class="js-vote-down-btn flex--item s-btn s-btn__unset c-pointer " data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Down vote" data-selected-classes="fc-theme-primary" data-unselected-classes="" aria-describedby="--stacks-s-tooltip-zo65mq8u" onClick={downVote}>
                        <svg aria-hidden="true" class="svg-icon iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
                    </button>
                    <div id="--stacks-s-tooltip-zo65mq8u" class="s-popover s-popover__tooltip pe-none" aria-hidden="true" role="tooltip" >This answer is not useful<div class="s-popover--arrow" ></div>
                    </div>

                    {/* TODO: add attribute to show its checked answer */}
                    {type && type == "answer" &&
                        <div class="js-accepted-answer-indicator flex--item fc-green-500 py6 mtn8" data-s-tooltip-placement="right" tabindex="0" role="note" aria-label="Accepted" data-controller="null s-tooltip" aria-describedby="--stacks-s-tooltip-0bkl8i4o">
                            <div class="">
                                <svg aria-hidden="true" class="svg-icon iconCheckmarkLg" width="36" height="36" viewBox="0 0 36 36"><path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path></svg>
                            </div>
                        </div>

                    }

                    {type && type == "question" &&
                        <button onClick={addBookmark} class="js-bookmark-btn s-btn s-btn__unset c-pointer py4 js-gps-track" data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Bookmark (1310)" data-selected-classes="fc-yellow-600" data-gps-track="post.click({ item: 1, priv: 0, post_type: 1 })" aria-describedby="--stacks-s-tooltip-jiwp6x09">
                            <svg aria-hidden="true" class="svg-icon iconBookmark" width="18" height="18" viewBox="0 0 18 18"><path d="M6 1a2 2 0 0 0-2 2v14l5-4 5 4V3a2 2 0 0 0-2-2H6Zm3.9 3.83h2.9l-2.35 1.7.9 2.77L9 7.59l-2.35 1.7.9-2.76-2.35-1.7h2.9L9 2.06l.9 2.77Z"></path></svg>
                            <div class="js-bookmark-count mt4" data-value="1310"></div>
                        </button>
                    }

                    {type && type == "question" &&
                        <a class="js-post-issue flex--item s-btn s-btn__unset c-pointer py6 mx-auto" href={"/activity/"+object.activity} data-shortcut="T" data-ks-title="timeline" data-controller="s-tooltip" data-s-tooltip-placement="right" aria-label="Timeline" aria-describedby="--stacks-s-tooltip-68gbpot6"><svg aria-hidden="true" class="mln2 mr0 svg-icon iconHistory" width="19" height="18" viewBox="0 0 19 18"><path d="M3 9a8 8 0 1 1 3.73 6.77L8.2 14.3A6 6 0 1 0 5 9l3.01-.01-4 4-4-4h3L3 9Zm7-4h1.01L11 9.36l3.22 2.1-.6.93L10 10V5Z"></path></svg></a>
                    }

                </div>
            }
            {typeof (object) == "undefined" && <p>Object not recieved</p>}
        </div>
    );

}

export default Upvote;