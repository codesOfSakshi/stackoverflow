const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { Question } = require("../services/question");

const topicName = "shop";

//1
//Get products of that particular shop
router.post("/getAllProducts", async (req, res) => {
  const questions = Question.getQuestionsByType(req.body.type,req.body.sortType)
  if(questions!=[]){
    kafka.make_request(topicName, req.body, (err, results) => {
        //Writing in redis for future use
        redisClient.set(key,JSON.stringify(results));
        questions(results);
  });

  try{
    const response = {}
    if(questions){
        response.success = true;
        response.data = questions;
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

  }
});

module.exports = router;