import React, { useEffect, useState } from "react";
import axiosApi from "../../config/axios.config";
import { constants } from "../../config/config";
import "./ReviewQuestions.css";

const ReviewQuestions = ()=>{

    const [questions, setQuestions ]=useState([]);

    const getQuestions = ()=>{

    }
    useEffect(getQuestions, []);

    return (
        <div>
            REVIEW QUESTIONS
            
        </div>
    )
}

export default ReviewQuestions;