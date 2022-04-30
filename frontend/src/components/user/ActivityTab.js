import React,{useState} from 'react';
import UserAnswerList from './UserAnswerList.js';
import UserQuestionList from './UserQuestionList.js';
import UserTagList from './UserTagList.js';
import UserReputationList from './UserReputationList.js';
import UserBadgeList from './UserBadgeList.js';
import UserBookmarkList from './UserBookmarkList.js';

const ActivityTab = () => {
    const [tabSelected,setTabSelected] = useState("answers");

    const changeTab = (tabName)=>{
        setTabSelected(tabName);
    }

  return (
      <>
        <div>ActivityTab</div>
        <nav>
            <ul class="s-navigation s-navigation__vertical">
                <li><a onClick={()=>{changeTab("answers")}} className={"s-navigation--item"+( tabSelected==="answers" ? " is-selected":"")}>Answers</a></li>
                <li><a onClick={()=>{changeTab("questions")}} className={"s-navigation--item"+( tabSelected==="questions" ? " is-selected":"")}>Questions</a></li>
                <li><a onClick={()=>{changeTab("tags")}} className={"s-navigation--item"+( tabSelected==="tags" ? " is-selected":"")}>Tags</a></li>
                <li><a onClick={()=>{changeTab("badges")}} className={"s-navigation--item"+( tabSelected==="badges" ? " is-selected":"")}>Badges</a></li>
                <li><a onClick={()=>{changeTab("bookmarks")}} className={"s-navigation--item"+( tabSelected==="bookmarks" ? " is-selected":"")}>Bookmarks</a></li>
                <li><a onClick={()=>{changeTab("reputation")}} className={"s-navigation--item"+( tabSelected==="reputation" ? " is-selected":"")}>Reputation</a></li>
            </ul>
        </nav>
        {
                tabSelected==="answers" && <UserAnswerList/>
        }
        {
                tabSelected==="questions" && <UserQuestionList/>
        }
        {
            tabSelected==="tags" && <UserTagList/>
        }
        {
            tabSelected==="badges" && <UserBadgeList/>
        }
        {
            tabSelected==="bookmarks" && <UserBookmarkList/>
        }
        {
            tabSelected==="reputation" && <UserReputationList/>
        }
    </>
  )
}

export default ActivityTab