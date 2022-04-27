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
                <div className='tags-box'>
                    <input
                        placeholder={'Filter by Tag Name'}
                        onChange={handleSearch}
                    />
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