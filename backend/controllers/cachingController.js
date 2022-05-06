const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cachegoose = require('cachegoose');
const QuestionModel =require('../models/question.js')


//1
//Get products of that particular shop
router.get("/getAllProducts", async (req, res) => {
  try{
    var questions = await QuestionModel.find({})
    .cache(0, 'RETRIEVE-ALL-QUESTIONS')
    .exec(function(err, questions) {
        if (err) throw err;  

        res.locals.navGalleries = questions;
      })

    console.log(questions)
    if(questions.length){
        res.send(questions);
      }else{
        res.send([]);
      }
  }catch(err){
      console.log(err);
      throw new Error("Some unexpected error occurred while getting "+type+" questions");
  }

});

router.get("/getDeleteProducts", async (req, res) => {
  try{
    var questions = await QuestionModel.deleteMany( { description: "Description" } )
    .cache(0, 'RETRIEVE-ALL-QUESTIONS')
    .exec(function(err, questions) {
        if (err) throw err;  

        res.locals.navGalleries = questions;
      })

    console.log(questions)
    if(questions.length){
        res.send(questions);
      }else{
        res.send([]);
      }
  }catch(err){
      console.log(err);
      throw new Error("Some unexpected error occurred while getting "+type+" questions");
  }

});

module.exports = router;