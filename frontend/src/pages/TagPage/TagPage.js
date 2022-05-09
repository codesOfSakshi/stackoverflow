import React, {useEffect, useState, Fragment} from 'react';
import TaggedQuestions from '../../components/Tags/TaggedQuestions';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { toggleButtonClasses } from '@mui/material';
import CompactQuestion from '../../Atom/CompactQuestion';
import { useParams } from 'react-router-dom';


const TagPage = () => {

    const [taggedQuestions , setTaggedQuestions] = useState();
    const [count, setCount] = useState(0);
    // const location = useLocation();
    const [tag, setTag] = useState();
    const [description, setDescription] = useState();
    const params = useParams();
    console.log(params.tagId);

    useEffect(() => {

        async function getQuestions(){

            // Get interesting questions by default
            const payload = {
                tagId: params.tagId,
                filterType: 1
            }

            let response = axios.post("http://localhost:3001/api/tags/questionbytag/", payload );
            response = await response;
    
            if(response.status === 200){
                setTaggedQuestions(response.data)
                setCount(response.data.length);
            }
            else{
                setCount(0);
            }

            console.log(response.data);
            setTag(params.tagId);
            // setDescription(location.state.description);

        }
        getQuestions();
    },[setTaggedQuestions, setCount, setDescription, setTag, params.tagId]);


    const handleFilterQuestions = async (filterType) => {

        console.log("SORTING BY: ", filterType)
        // TODO: Sort Questions based on the sortType button clicked
        const payload = {
            tagId: params.tagId,
            filterType: filterType
        }
        let response = axios.post("http://localhost:3001/api/tags/questionbytag/", payload );
        response = await response;

        if(response.status === 200){
            setTaggedQuestions(response.data)
            setCount(response.data.length);
        }
        else{
            setCount(0);
        }
    }


    return (
        <div>
            <div id='mainbar' class='questions-page fc-black-800 ' style={{marginLeft:270, marginRight:270}} >

                <div class="s-page-title">
                    <div class="s-page-title--text">
                        <h1 class="s-page-title--header">Questions tagged [{params.tagId}]</h1>
                        <br/>
                        <p class="s-page-title--description">
                            {/* {description} */}
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

                    <div class="uql-nav flex--item" data-action="se-uql-list:edit-current-requested@document->se-uql#toggleEditor">
                        <div class="d-flex ai-center jc-space-between">
                            <div class="js-uql-navigation s-btn-group flex--item mr16 ff-row-nowrap">
                                    <a onClick={() => handleFilterQuestions(1)} class="s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex" data-nav-value="Newest" data-shortcut="N">
                                        <div class="flex--item">Interesting</div>
                                    </a>
                                    <a  onClick={() => handleFilterQuestions(2)} class="s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex" data-nav-value="Active" data-shortcut="A">
                                        <div class="flex--item">Hot</div>
                                    </a>
                                    <a  onClick={() => handleFilterQuestions(3)} class="s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex" data-nav-value="Bounties" data-shortcut="E">
                                        <div class="flex--item">Score</div>
                                    </a>
                                    <a onClick={() => handleFilterQuestions(4)} class="s-btn s-btn__muted s-btn__outlined s-btn__sm d-flex" data-nav-value="Unanswered" data-shortcut="U">
                                        <div  class="flex--item">Unanswered</div>
                                    </a>
                            </div>
                        </div>
                     </div>
                </div>

                {count > 0 ? 
                    <div id="questions" class=" flush-left">

                        {taggedQuestions.map((question, index) => ( 
                            <TaggedQuestions key={index} question={question}/>
                            // <CompactQuestion questions={question}/>
                        ))}

                    </div>
            
                :
                
                "No Tagged questions"
                }
                
            </div>
    </div>
    )
}

export default TagPage;