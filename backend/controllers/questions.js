const express = require("express");
const router = express.Router();
const { User } = require("../services/user");
const { Question } = require("../services/question");
const {checkAuth} = require("../passport");

router.post("/add",checkAuth,  async (req, res) => {
    const question = req.body
    console.log("in route",question)
    const response = {};
    try{
        const questionModelResponse = await Question.addQuestion(question);
        if(questionModelResponse){
            response.success = true;
            response.result = questionModelResponse;
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

router.post("/edit", checkAuth, async (req, res) => {
    console.log(req.body)
    const response = {};
    try{
        const questionModelResponse = await Question.editQuestion(req.body);
        if(questionModelResponse){
            response.success = true;
            response.message = questionModelResponse;
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

router.get("/:questionId",  async (req, res) => {
    const response = {};
    try{
        const question = req.params.questionId;
        console.log(question)
        const questionModelResponse = await Question.getQuestionsBasedOnId(question);
        response.success = true;
        response.data = questionModelResponse;
        response.status = 200;
        res.status(200).send(response);
    }catch(e){
        console.log(e);
        response.success = false;
        response.error = "Some error occurred. Please try again later";
        response.status = 500;
        res.status(500).send(response);
    }
});

router.post("/", async (req, res) => {
    try{
        const response = {}
        const questionModelResponse = await Question.getQuestionsByType(req.body.type,req.body.sortType);
        if(questionModelResponse){
            response.success = true;
            response.data = questionModelResponse;
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