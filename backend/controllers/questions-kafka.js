const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { Question } = require("../services/question");
const redisClient = require('../services/redisservice.js');

const topicName = "question_topic";

//1
//Get products of that particular question_topic
router.post("/getAllProducts", async (req, res) => {
  const questions =await Question.getQuestionsByType(req.body.type,req.body.sortType)
  console.log("questions============",questions)
  if(!questions || questions.length==0){
    msg = {};
    msg.params = req.params
    msg.body = req.body;
    kafka.make_request(topicName, msg, (err, results) => {
      let key = "";
      if (req.body.sortType == "desc" || req.body.sortType == -1) {
        key = "-1";
      }else{
        key = "1";
      }
      if(req.body.type == "Interesting" || req.body.type == 1){
        key+="1";
      }else if(req.body.type == "Hot" || req.body.type == 2){
        key+="2";
      }else if(req.body.type == "Score" || req.body.type == 3){
        key+="3";
      }else if(type == "Unanswered" || type == 4){
        key+="4";
      }
          redisClient.set(key,JSON.stringify(results));
          if(err){ 
          console.log(e);
          response.success = false;
          response.error = "Some error occurred. Please try again later";
          response.status = 500;
          res.status(500).send(response);
          }
          else{        
          var response={};
          response.success = true;
          response.data = results;
          response.status = 200;
          res.status(200).send(response);
          }
  });}else{
    var response={};
    response.success = true;
    response.data = questions;
    response.status = 200;
    res.status(200).send(response);
  }
})

  // try{
  //   const response = {}
  //   if(questions){
  //       response.success = true;
  //       response.data = questions;
  //       response.status = 200;
  //       res.status(200).send(response);
  //   }
  //   }catch(e){
  //       console.log(e);
  //       response.success = false;
  //       response.error = "Some error occurred. Please try again later";
  //       response.status = 500;
  //       res.status(500).send(response);
  //   }

  // }
// });

module.exports = router;