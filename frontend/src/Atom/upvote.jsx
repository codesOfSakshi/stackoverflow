import React, { useEffect, useState } from "react";
import axios from 'axios';

const Upvote = (props) => {

    const[questionId, setquestionId] = useState()
    const[answerId, setanswerId] = useState()
    const[type, settype] = useState(props.type)
    const[voter,setvoter] = useState(props.decoded)
    const[bst,setbst] = useState(false)
    var voteType = 'Downvote'

    var length = props.object.upVotes?.length - props.object.downVotes?.length

    const onDownVoteClick =async ()=>{
        if(type && type === 'question'){
            console.log("inside type && type")
            axios.post("http://localhost:3001/api/vote", {voteType:voteType, questionId : props.object._id, type:type, voter: voter})
                .then(response => {
                    console.log(response);
                })
        }
        else{
            axios.post("http://localhost:3001/api/vote", {voteType:voteType, answerId : props.object._id, type:type, voter: voter})
            .then(response => {
                console.log(response);
            })
        }
    }

    const onUpVoteClick =async ()=>{
        voteType = 'Upvote'

        if(type && type == 'question'){
            axios.post("http://localhost:3001/api/vote", {voteType:voteType, questionId : props.object._id, type:type, voter: voter})
                .then(response => {
                    console.log(response);
                })
        }
        else{
            axios.post("http://localhost:3001/api/vote", {voteType:voteType, answerId : props.object._id, type:type, voter: voter})
            .then(response => {
                console.log(response);
            })
        }
    }

    const bestanswer = async () =>{
        if(bst){
            await setbst(false)
        }
        else{
            await setbst(true)
            axios.post("http://localhost:3001/api/answer/mark", {questionId : props.question._id, answerId : props.object._id})
                .then(response => {
                    console.log(response);
                })
        }
    }


    return (
        <div>
            {props.object &&
                <div style={{ "color": "#babfc4" }}>
                    <button class="js-vote-up-btn flex--item s-btn s-btn__unset c-pointer " data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Up vote" data-selected-classes="fc-theme-primary" data-unselected-classes="" aria-describedby="--stacks-s-tooltip-rk2wmyoh" onClick={onUpVoteClick}>
                        <svg aria-hidden="true" class="svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 25h32L18 9 2 25Z"></path></svg>
                    </button>
                    <div id="--stacks-s-tooltip-rk2wmyoh" class="s-popover s-popover__tooltip pe-none" aria-hidden="true" role="tooltip" >This answer is useful<div class="s-popover--arrow" ></div>
                    </div>
                    <div class="js-vote-count flex--item d-flex fd-column fc-black-500 fs-title" itemprop="upvoteCount" data-value="1874">
                        &ensp;{length || 0}
                    </div>
                    <button class="js-vote-down-btn flex--item s-btn s-btn__unset c-pointer " data-controller="s-tooltip" data-s-tooltip-placement="right" aria-pressed="false" aria-label="Down vote" data-selected-classes="fc-theme-primary" data-unselected-classes="" aria-describedby="--stacks-s-tooltip-zo65mq8u" onClick={onDownVoteClick}>
                        <svg aria-hidden="true" class="svg-icon iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36"><path d="M2 11h32L18 27 2 11Z"></path></svg>
                    </button>
                    <div id="--stacks-s-tooltip-zo65mq8u" class="s-popover s-popover__tooltip pe-none" aria-hidden="true" role="tooltip" >This answer is not useful<div class="s-popover--arrow" ></div>
                    </div>



                    {/* TODO: add attribute to show its checked answer */}
                    {bst && props.type && props.type == "answer" && 
                        <button class="js-accepted-answer-indicator flex--item fc-green-500 py6 mtn8" data-s-tooltip-placement="right" tabindex="0" role="note" aria-label="Accepted" data-controller="null s-tooltip" aria-describedby="--stacks-s-tooltip-0bkl8i4o" aria-pressed="false" data-selected-classes="fc-green-500" data-title-accept="Accept this answer if it solved your problem or was the most helpful in finding your solution" data-title-unaccept="You accepted this answer  (select to undo)" aria-label="Accept answer" data-s-tooltip-placement="right" data-controller="null s-tooltip" aria-describedby="--stacks-s-tooltip-9bp99esw" onClick = {bestanswer}>
                            <svg aria-hidden="true" class="m0 svg-icon iconCheckmarkLg" width="36" height="36" viewBox="0 0 36 36"><path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path></svg>
                        </button>
                    }
                    {props.type == "answer" && props.question.bestAns === props.object._id &&
                        <div class="js-accepted-answer-indicator flex--item fc-green-500 py6 mtn8" data-s-tooltip-placement="right" tabindex="0" role="note" aria-label="Accepted" data-controller="null s-tooltip" aria-describedby="--stacks-s-tooltip-0bkl8i4o">
                            <div class="">
                                <svg aria-hidden="true" class="svg-icon iconCheckmarkLg" width="36" height="36" viewBox="0 0 36 36"><path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path></svg>
                            </div>
                        </div>
                    }

                    {!bst && props.type == "answer" && props.question.bestAns !== props.object._id && 
                    <button class="js-accept-answer-btn  flex--item s-btn s-btn__unset c-pointer" aria-pressed="false" data-selected-classes="fc-green-500" data-title-accept="Accept this answer if it solved your problem or was the most helpful in finding your solution" data-title-unaccept="You accepted this answer  (select to undo)" aria-label="Accept answer" data-s-tooltip-placement="right" data-controller="null s-tooltip" aria-describedby="--stacks-s-tooltip-9bp99esw" onClick = {bestanswer}>
                                    <svg aria-hidden="true" class="m0 svg-icon iconCheckmarkLg" width="36" height="36" viewBox="0 0 36 36"><path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path></svg>
                    </button>
                    }

                </div>
            }
            {typeof (props.object) == "undefined" && <p>props.Object not recieved</p>}
        </div>
    );

}

export default Upvote;