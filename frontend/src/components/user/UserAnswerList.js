import React, {useEffect, useState} from 'react'
import UserAnswer from './UserAnswer'
import {axiosInstance as authapi} from '../../services/authaxiosservice';
import {useParams} from "react-router-dom";
function UserAnswerList() {


    const [answer, setAnswer] = useState([]);

    const GET_USER_API = "api/user/answer/activity/";
    const params = useParams();
    console.log(params)
    const { userId: userId } = params;
    console.log(params)

    const getUser = async () => {

        try{
            const response = await authapi.get(GET_USER_API+userId);
            if(response && response.data){
                    console.log(response.data.data)
                    setAnswer(response.data.data);
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
    },[]);

    return (

        <div className="ba bc-black-100 bar-md">

            <div id="js-post-summaries">

            <UserAnswer answer={answer}/>



            </div>

        </div>
    )
}

export default UserAnswerList;


