var mongoose = require('mongoose');

const {Question} = require("./question.js");
const QuestionModel = require('../models/question');

const AnswerModel = require('../models/answer.js');


class Answer{
   

    static answerActivityDetailForUser = async (req)=>{
        try{
            const userId = req.params.userId;
            const answerId = req.params.answerId;
            const query = {
                user:mongoose.Types.ObjectId(userId),
                _id:mongoose.Types.ObjectId(answerId) 
            }
            let answer = await AnswerModel.findOne(query);
            console.log("answer", answer, query)
            answer = JSON.parse(JSON.stringify(answer));
            if(answer){
                return answer;
            }else{
                return [];
            }
                
        }catch(err){
            console.log(err);
            throw new Error("Error while fetching answers details");
        }
    }

    static postAnswer = async (answer,user,questionId)=>{
        try{
            const query = {
                description:answer,
                user:user,
            };
            const insertanswer = new AnswerModel(query);
            const result = await insertanswer.save();
            if(result){
                console.log("RESULT FROM ANSWER IS", result);
                const id = result._id;
                console.log("==="+questionId);
                const updateAnswer = await Question.updateAnswerId(id,questionId);
                return {result:result, updateAns:updateAnswer};
            }else{
                return {};
            }
        }
        catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while inserting answer");
        }
    }

    static postBestAnswer = async(answerId, questionId) =>{
        try{
            const findCondition = {
                _id:mongoose.Types.ObjectId(questionId),
            };
            console.log("==========="+questionId)
            const updateCondition = {
                "bastAns":  answerId
            }
            console.log(findCondition);
            const result = await QuestionModel.updateOne(findCondition,updateCondition);
            console.log("Question result is", result);
            if(result){
                console.log("RESULT IS", result)
                return result
            }else{
                return {}; 
            }
        }
        catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while inserting answer");
        }
      } 

    
}

module.exports.Answer = Answer;