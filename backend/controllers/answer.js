const express = require("express");
const router = express.Router();
const {Answer} = require("../services/answer");

router.post("/",  async (req, res) => {
    const questionId = req.body.questionId;
    const answer = req.body.answer;
    const user = req.body.user;
    const response = {};
    try{
        const answerResult = await Answer.postAnswer(answer,user,questionId);
        if(answerResult){
            response.success = true;
            response.questionId = questionId;
            response.answer = answer
            response.status = 200;
            res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

router.post("/id", async(req,res) =>{
    const answerId = req.body.answerId;
    const response ={};
    console.log("inside answerr get")
    try{
        const answer = await Answer.getAnswer(answerId);
        if(answer){
            response.success = true;
            response.answerId = answerId;
            response.answer = answer
            response.status = 200;
            res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }

})

router.post("/mark",  async (req, res) => {
    const questionId = req.body.questionId;
    const answerId = req.body.answerId;
    const response = {};
    try{
        const bestAns = await Answer.postBestAnswer(answerId, questionId);
        console.log("BEST ANS IN CONTROLLER IS", bestAns, bestAns.length)
        if(bestAns){
            console.log("best answer")
            response.success = true;
            response.questionId = questionId;
            response.answerId = answerId;
            response.status = 200;
            res.status(200).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

module.exports = router;