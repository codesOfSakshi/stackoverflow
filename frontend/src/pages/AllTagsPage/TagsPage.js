import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import './TagsPage.scss';
import TagPanel from '../../components/Tags/TagPanel';

const TagsPage = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {

        async function getTags() {
            let response = axios.get("http://localhost:5000/api/tags");
            response = await response;
    
            setTags(response.data);
            console.log(response.data);
        }
        
        getTags();

    },[setTags]);

    const handleSearch = () => {
        // Handle Tag Search here
    }

    return(
        <Fragment>
            <div id='mainbar' className='tags-page fc-black-800'>
                <h1 className='headline'>Tags</h1>
                <p className='fs-body'>
                A tag is a keyword or label that categorizes your question with other,similar questions.<br/>
                Using the right tags makes it easier for others to find and answer your question.
                </p>
                <br/>
                <div class="d-flex fw-wrap" style={{marginLeft:15}}>
                    <div class="flex--item ps-relative mb12">
                        <input id="tagfilter" class="s-input s-input__search h100" onChange={handleSearch} autocomplete="off" name="tagfilter" type="text" maxlength="35" placeholder="Filter by tag name" autofocus=""/>
                        <svg aria-hidden="true" class="s-input-icon s-input-icon__search svg-icon iconSearch" width="18" height="18" viewBox="0 0 18 18"><path d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0Z"></path></svg>
                    </div>
                </div>
                <br/>
                <div className='user-browser'>
                    <div className='grid-layout'>
                        {tags.map((tag, index) => (
                            <TagPanel key={index} tag={tag} />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default TagsPage;