const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { Question } = require("../services/question");

const topicName = "shop";

//1
//Get products of that particular shop
router.post("/getAllProducts", async (req, res) => {
  const questions =await Question.getQuestionsByType(req.body.type,req.body.sortType)
  console.log("questions============",questions)
  if(questions.length==0){
    msg = {};
    msg.params = req.params
    msg.body = req.body;
    kafka.make_request(topicName, msg, (err, results) => {
        // redisClient.set(key,JSON.stringify(questions));
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
  });}
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