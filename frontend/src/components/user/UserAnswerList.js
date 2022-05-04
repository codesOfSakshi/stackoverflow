import React, {useEffect, useState} from 'react'
import UserAnswer from './UserAnswer'
import axiosService from "../../services/axiosservice";
import {useParams} from "react-router-dom";
function UserAnswerList() {


    const [answer, setAnswer] = useState([]);

    const GET_USER_API = "api/user/";
    const params = useParams();
    console.log(params)
    const { userId: userId } = params;
    console.log(params)

    const getUser = async () => {

        try{
            const response = await axiosService.get(GET_USER_API+userId);
            if(response && response.data && response.data.success && response.data.user.answers){
                if(response.data.user.answers) {
                    setAnswer(response.data.user.answers);
                }
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


