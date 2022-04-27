import React, { useEffect } from 'react';
// import { CCard, CCardBody, CCardTitle, CCardText } from '@coreui/react'

const TagPanel = (props) => {

    // console.log(props.tag.name)
    return (
        <div className="grid--item s-card js-tag-cell d-flex fd-column">
            <div className="d-flex jc-space-between ai-center mb12">
                <a class="flex--item s-tag" href='#'>{props.tag.name}</a>
                {/* <a size={'s-tag'} float={'left'}>{props.tag.name}</a> */}
            </div>

            <div className="flex--item fc-medium mb12 v-truncate4">
                {props.tag.description} (The FULL Description of the tag from the database will appear here)
            </div>

            <div className="mt-auto d-flex jc-space-between fs-caption fc-black-400">
                {props.tag.numQuestions == 0 ? 
                
                    <div className="flex--item">0 questions asked</div>

                :

                <>
                    <div className="flex--item">
                        {props.tag.numQuestions} {props.tag.numQuestions === 1 ? 'question' : 'questions'}
                    </div>
                    
                    <div className="flex--item s-anchors s-anchors__inherit">
                        {props.tag.numQuestionsToday} asked today, {props.tag.numQuestionsThisWeek} this week
                    </div>
                </>
                
                }

            </div>
        </div>
  );
};

// TagPanel.propTypes = {
//   tag: PropTypes.object.isRequired,
// };
export default TagPanel;