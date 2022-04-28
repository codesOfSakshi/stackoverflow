const express = require("express");
const router = express.Router();
const { User } = require("../services/user");
const { Answer } = require("../services/answer");
const { Question } = require("../services/question");
const { ReputationHistory } = require("../services/reputationhistory");
const { ReputationAction } = require("../services/reputationaction");


router.get("/bookmark/:userId",  async (req, res) => {
    const userId = req.params.userId;
    const response = {};
    try{
        const userObj = {userId};
        const questionIds = await User.getBookMarkQuestionIds(userObj);
        if(questionIds?.length){
            const questionObj = {};
            questionObj.questionIds = questionIds;
            const questions = await Question.getQuestions(questionObj);
            if(questions?.length){
                response.success = true;
                response.bookMarkQuestions = questions;
                response.status = 200;
                res.status(200).send(response);
            }else{
                response.success = true;
                response.bookMarkQuestions = [];
                response.status = 200;
                res.status(200).send(response);
            }
        }else{
            response.success = true;
            response.bookMarkQuestions = [];
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

router.post("/addbookmark/:userId",  async (req, res) => {
    const response = {};
    try{
        const questionIds = await User.addToBookMark(req);
        response.success = true;
        response.status = 200;
        res.status(200).send(response);
      
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Request Failed! Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

router.get("/reputation/history/:userId",  async (req, res) => {
    const userId = req.params.userId;
    const response = {};
    try{
        const userObj = {userId};
        const reputationHistory = await ReputationHistory.getReputationHistoryByUserId(userObj);
        if(reputationHistory?.length){
            response.success = true;
            response.reputationHistory = reputationHistory;
            response.status = 200;
            res.status(200).send(response);
        }else{
            response.success = true;
            response.reputationHistory = [];
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

router.get("/reputation/:userId",  async (req, res) => {
    const userId = req.params.userId;
    const response = {};
    try{
        const userObj = {userId};
        const reputation = await User.getReputation(userObj);
        if(reputation){
            response.success = true;
            response.reputation = reputation;
            response.status = 200;
            res.status(200).send(response);
        }else{
            response.success = true;
            response.reputation = 0;
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

router.post("/edit/:userId",  async (req, res) => {
    const response = {};
    try{
        
        const successData = await User.editUser(req);
        console.log("successData", successData)
        if(successData){
            response.success = true;
            response.data = successData;
            response.status = 200;
            res.status(200).send(response);
        }else{
            response.success = false;
            response.status = 400;
            res.status(400).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Request Failed! Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});


router.get("/answer/activity/:userId/:answerId",  async (req, res) => {
    const userId = req.params.userId;
    const response = {};
    try{
        
        const successData = await Answer.answerActivityDetailForUser(req);
        if(successData){
            response.success = true;
            response.data = successData;
            response.status = 200;
            res.status(200).send(response);
        }else{
            response.success = false;
            response.status = 400;
            res.status(400).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Request Failed! Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

router.get("/question/activity/:questionId",  async (req, res) => {
   
    const response = {};
    try{
        
        const successData = await Question.getQuestionsById(req);
        if(successData){
            response.success = true;
            response.data = successData;
            response.status = 200;
            res.status(200).send(response);
        }else{
            response.success = false;
            response.status = 400;
            res.status(400).send(response);
        }
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Request Failed! Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

module.exports = router;