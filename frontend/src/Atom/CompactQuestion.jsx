import { Card, Col, Row, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './atom.css';
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago'

function CompactQuestion(props) {
    const [date, setDate] = useState([])
    const question = props.questions
    console.log("QUESTION ID:", question._id);
    const questionLink = "/question/" + props.questions._id
    const userLink = "/user/" + "abhsjdahj"

    let navigate = useNavigate();
    const questiondisplay = () => {
        navigate(`/question/${props.questions._id}`)
    }

    useEffect(() => {

    }, [])

    return (
        <div>
        { question && 
            <div>
            <Card class="border-0">

                <div class="s-post-summary s-post-summary__minimal">
                    <div class="s-post-summary--stats">
                        <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                            <span class="s-post-summary--stats-item-number">
                                {question.upVotes && question.upVotes.length}
                            </span>
                            <span class="s-post-summary--stats-item-unit">
                                votes
                            </span>
                        </div>
                        <div class="s-post-summary--stats-item">
                            <div class="js-accepted-answer-indicator flex--item fc-green-500 py6 mtn8" data-s-tooltip-placement="right" tabindex="0" role="note" aria-label="Accepted" data-controller="null s-tooltip" aria-describedby="--stacks-s-tooltip-0bkl8i4o"></div>
                            <span class="s-post-summary--stats-item-number">
                                {question.answers.length}
                            </span>
                            <span class="s-post-summary--stats-item-unit">
                                answers
                            </span>
                        </div>
                        <div class="s-post-summary--stats-item">
                            <span class="s-post-summary--stats-item-number">
                                {question.views}
                            </span>
                            <span class="s-post-summary--stats-item-unit">
                                views
                            </span>
                        </div>
                    </div>
                    <div class="s-post-summary--content">
                        <h3 class="s-post-summary--content-title" onClick={questiondisplay}>
                            <div style={{ "color": "blue" }}>{question.title}</div>
                        </h3>
                        <div class="s-post-summary--meta">
                            {question.tags.map(tag => {
                                return (<><div class="s-post-summary--meta-tags" onClick={questiondisplay}>
                                    <a class="s-tag" href={questiondisplay}>{tag}</a>
                                </div></>)
                            })}


                            <div class="s-user-card s-user-card__minimal">
                                <a href="…" class="s-avatar s-user-card--avatar">
                                    {question.user && <img class="s-avatar--image" src={question.user.profilePicture} />}
                                </a>
                                <a href="…" class="s-user-card--link">{question.user?.name}</a>
                                <time class="s-user-card--time">
                                    {question.createdAt &&
                                        <ReactTimeAgo date={Date.parse(question.createdAt)} locale="en-US" />}</time>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>

    }
    {!question && <p> Question object not present </p>}
    </div>
    
  );
}

export default CompactQuestion;