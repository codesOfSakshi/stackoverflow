import React, { useEffect, useState } from "react";

const Upvote = ({ type, object, upVote, downVote }) => {

    return (
        <div>
            {object &&
                <div style={{ "color": "#babfc4" }}>
                    <button class="js-vote-up-btn flex--item s-btn s-btn__unset c-pointer " data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Up vote" data-selected-classes="fc-theme-primary" data-unselected-classes="" aria-describedby="--stacks-s-tooltip-rk2wmyoh" onClick={upVote}>
                        <svg aria-hidden="true" class="svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
                    </button>
                    <div id="--stacks-s-tooltip-rk2wmyoh" class="s-popover s-popover__tooltip pe-none" aria-hidden="true" role="tooltip" >This answer is useful<div class="s-popover--arrow" ></div>
                    </div>
                    <div class="js-vote-count flex--item d-flex fd-column fc-black-500 fs-title" itemprop="upvoteCount" data-value="1874">
                        &ensp;{object.upVotes?.length || 0}
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

                </div>
            }
            {typeof (object) == "undefined" && <p>Object not recieved</p>}
        </div>
    );

}

export default Upvote;