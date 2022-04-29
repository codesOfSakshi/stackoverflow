import React, {useEffect, useState, Fragment} from 'react';
import TaggedQuestions from '../../components/Tags/TaggedQuestions';
// import {useLocation} from 'react-router';
import axios from 'axios';

const TagPage = () => {

    const [taggedQuestions , setTaggedQuestions] = useState();
    const [count, setCount] = useState(0);
    // const location = useLocation();

    useEffect(() => {

        async function getQuestions(){
     
            //location.state.tag
            let response = axios.get("http://localhost:5000/api/tags/questionbytag/" + "java" );
            response = await response;
            
            setTaggedQuestions(response.data)
            setCount(response.data.length);

            console.log(response.data);

        }
        getQuestions();
    },[setTaggedQuestions, setCount]);

    return (
        <div>
            <div id='mainbar' class='questions-page fc-black-800 ' style={{marginLeft:250, marginRight:250}} >

                <div class="s-page-title">
                    <div class="s-page-title--text">
                        <h1 class="s-page-title--header">Questions tagged [java]</h1>
                        <br/>
                        <p class="s-page-title--description">
                            Tag Description here: blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah
                        </p>
                    </div>
                    <div class="s-page-title--actions">
                        <button className='s-btn s-btn__primary'>Ask Question</button>
                    </div>
                </div>

                <div class="d-flex ai-center jc-space-between mb12 sm:fd-column sm:ai-stretch">
                    <div class="fs-body3 flex--item fl1 mr12 sm:mr0 sm:mb12">
                        {count} Questions
                    </div>
                    <div class="fs-body3 flex--item fl1 mr12 sm:mr0 sm:mb12">
                        {/* //////Buttons here////// */}
                    </div>
                </div>

                {count > 0 ? 
                    <div id="questions" class=" flush-left">

                        {/* {tags.map((tag, index) => (
                            <TagPanel key={index} tag={tag} />
                        ))} */}

                        {taggedQuestions.map((question, index) => ( 
                            <TaggedQuestions key={index} question={question}/>
                        ))}

                    </div>
            
                :
                
                "No Tagged questions"}
                
            </div>
    </div>
    )
}

export default TagPage;