import React, {useEffect, useState, Fragment} from 'react';
import TaggedQuestions from '../../components/Tags/TaggedQuestions';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

const TagPage = () => {

    const [taggedQuestions , setTaggedQuestions] = useState();
    const [count, setCount] = useState(0);
    const location = useLocation();

    useEffect(() => {

        async function getQuestions(){
     
            let response = axios.get("http://localhost:3001/api/tags/questionbytag/" + location.state.tagId );
            response = await response;
    
            if(response.status === 200){
                setTaggedQuestions(response.data)
                setCount(response.data.length);
            }
            else{
                setCount(0);
            }

            console.log(response.data);

        }
        getQuestions();
    },[setTaggedQuestions, setCount, location.state.tagId]);

    return (
        <div>
            <div id='mainbar' class='questions-page fc-black-800 ' style={{marginLeft:250, marginRight:250}} >

                <div class="s-page-title">
                    <div class="s-page-title--text">
                        <h1 class="s-page-title--header">Questions tagged [{location.state.tagId}]</h1>
                        <br/>
                        <p class="s-page-title--description">
                            {location.state.description}
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