import React from 'react'
import Stack from '@mui/material/Stack';
import ReactTimeAgo from 'react-time-ago';

function UserBookmark({bookMarkQuestion}) {
    return (
        <div className="ba bc-black-100">
            <div className="s-post-summary--stats">
                <Stack direction="row" spacing={2}>
                <div className="s-post-summary--stats-item has-answers">
                    {bookMarkQuestion.answers.length+" answers"}
                </div>
                 <div className="s-post-summary--stats-item">
                    {(bookMarkQuestion?.views ? bookMarkQuestion?.views : 0 )+" views"}
                </div>
                <div className="s-post-summary--stats-item">
                    {(bookMarkQuestion?.upVotes?.length ? bookMarkQuestion?.upVotes?.length : 0 )+" upvotes"}
                </div>
                <div className="s-post-summary--stats-item">
                    {(bookMarkQuestion?.downVotes?.length ? bookMarkQuestion?.downVotes?.length : 0 )+" downvotes"}
                </div>
                </Stack>
            </div>
            <div className="s-post-summary--content">
                <span>
                    <a href={"/question/"+bookMarkQuestion._id}
                       className="s-post-summary--content-title s-link">{bookMarkQuestion.title}</a>
                </span>

                <div className="s-popover px0 py4 w-auto" id="post-menu-63110429" role="menu">



                            <div id="--stacks-s-tooltip-ou1ilnoq" className="s-popover s-popover__tooltip pe-none"
                                 aria-hidden="true" role="tooltip">You have bookmarked this question (click to undo).
                                <div className="s-popover--arrow"></div>
                            </div>

                </div>
                {bookMarkQuestion.tags && bookMarkQuestion.tags.map((tag)=>{
                    return (<span key={tag} style={{display:"inline",marginRight:"10px"}} className="s-post-summary--meta">
                        <a className="flex--item s-tag" href={"/tag/"+tag}>{tag}</a>
                    </span>)
                })}
                <div className="s-user-card s-user-card__minimal">
                    <time className="s-user-card--time">
                        <span className="relativetime">
                            <ReactTimeAgo date={Date.parse(bookMarkQuestion?.createdAt)} locale="en-US" />
                        </span>
                    </time>
                </div>
            </div>
        </div>
    )
}

export default UserBookmark;