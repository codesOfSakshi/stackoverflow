import React, {useEffect, useState} from 'react'
import UserAnswer from './UserAnswer'
import axiosService from "../../services/axiosservice";
function UserAnswerList() {


    const [answer, setAnswer] = useState(0);


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


