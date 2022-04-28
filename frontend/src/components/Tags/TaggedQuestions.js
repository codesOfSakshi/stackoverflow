import React from 'react'

const TaggedQuestions = (props) => {

    return (
        <div>
            
            <div id="question-summary-72023260" class="s-post-summary js-post-summary" data-post-id="72023260" data-post-type-id="1">
                <div class="s-post-summary--stats js-post-summary-stats">
                    <div class="s-post-summary--stats-item s-post-summary--stats-item__emphasized" title="Score of 0">
                        <span class="s-post-summary--stats-item-number">{props.question.upVotes.length}</span>
                        <span class="s-post-summary--stats-item-unit">votes</span>
                    </div>
                    <div class="s-post-summary--stats-item  " title="0 answers">
                        <span class="s-post-summary--stats-item-number">{props.question.answers.length}</span>
                        <span class="s-post-summary--stats-item-unit">answers</span>
                    </div>
                    <div class="s-post-summary--stats-item " title="4 views">
                        <span class="s-post-summary--stats-item-number">{props.question.views}</span>
                        <span class="s-post-summary--stats-item-unit">views</span>
                    </div>
                </div>

                <div class="s-post-summary--content">
            
                    <h3 class="s-post-summary--content-title">
                        <a href="/questions/72023260/from-p-to-a-list" class="s-link">{props.question.title}</a>
                    </h3>
                    <div class="s-post-summary--content-excerpt">
                        {props.question.description}
                    </div>
                    <div class="s-post-summary--meta">
                        <div class="s-post-summary--meta-tags tags js-tags t-javascript t-css t-wordpress">

                            {props.question.tags.map((tag, index) => ( 
                                <a href="/questions/tagged/<TagName>" class="flex--item s-tag" title="show questions tagged <TagName>" rel="tag">
                                    {tag}
                                </a>
                            ))}
                            {/* <a href="/questions/tagged/javascript" class="post-tag flex--item mt0 js-tagname-javascript" title="show questions tagged 'javascript'" rel="tag">
                                javascript
                            </a>
                            
                            <a href="/questions/tagged/css" class="post-tag flex--item mt0 js-tagname-css" title="show questions tagged 'css'" rel="tag">
                                css
                            </a>
                            
                            <a href="/questions/tagged/wordpress" class="post-tag flex--item mt0 js-tagname-wordpress" title="" rel="tag">
                                wordpress
                            </a>  */}
                        </div>

                        <div class="s-user-card s-user-card__minimal">
                
                            {/* <a href="/users/16834391/arvydas" class="s-avatar s-avatar__16 s-user-card--avatar">        
                                <div class="gravatar-wrapper-16 js-user-hover-target" data-user-id="16834391">
                                    <img src="https://i.stack.imgur.com/irb32.jpg?s=32&amp;g=1" alt="user avatar" width="16" height="16" class="s-avatar--image"/>
                                </div>  
                            </a> */}
                        
                            <div class="s-user-card--info">
                                <div class="s-user-card--link d-flex gs4">
                                    <a href="/users/16834391/arvydas" class="flex--item">{props.question.userId}</a>
                                </div>
                            
                                {/* <ul class="s-user-card--awards">
                                    <li class="s-user-card--rep">
                                        <span class="todo-no-class-here" title="reputation score " dir="ltr">1</span>
                                    </li>
                                </ul> */}
                            </div>

                            {/* <time class="s-user-card--time">asked <span title="2022-04-27 04:25:18Z" class="relativetime">2 mins ago</span></time> */}

                        </div>
            
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TaggedQuestions