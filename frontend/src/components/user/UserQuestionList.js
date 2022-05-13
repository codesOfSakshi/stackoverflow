import React, {useEffect, useState} from 'react'
import UserQuestion from './UserQuestion'
import {axiosInstance as authapi} from '../../services/authaxiosservice';

import {useParams} from "react-router-dom";
function UserQuestionList() {

    const [question, setQuestion] = useState([]);

    const GET_USER_API = "api/user/question/activity/";
    const params = useParams();
    console.log(params)
    const { userId: userId } = params;
    console.log(params)

    const getUser = async () => {

        try{
            const response = await authapi.get(GET_USER_API+userId);

                console.log(response.data.data)
                setQuestion(response.data.data);

        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
    },[]);

    console.log(question)
    return (

        <div className="ba bc-black-100 bar-md">

            <div id="js-post-summaries">

                <UserQuestion question={question}/>

            </div>

        </div>
    )
}

export default UserQuestionList;


