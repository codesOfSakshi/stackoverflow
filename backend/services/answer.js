var mongoose = require('mongoose');

const {Question} = require("./question.js");
const QuestionModel = require('../models/question');

const AnswerModel = require('../models/answer.js');

const UserModel = require('../models/user');


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
                const finduserCondition = {
                    _id:mongoose.Types.ObjectId(user),
                };
                const ansupdateCondition = {
                    $addToSet:{
                        "questionsAnswered":  result._id
                    } 
                }
                let userresult = await UserModel.updateOne(finduserCondition, ansupdateCondition)
                console.log("userresult", userresult)

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
        var reputationIncrement = null;
        var userUpdateCondition = null;
        var userUpdateConditionnew = null;
        try{
            const findCondition = {
                _id:mongoose.Types.ObjectId(questionId),
            };
            
            const updateCondition = {
                "bestAns":  answerId
            }

            var questions =await QuestionModel.findById(questionId).populate("answers");
            if(questions.bestAns){
                console.log("inside")
                var answers =await AnswerModel.findById(questions.bestAns)
                var user = await UserModel.findById(answers.user)
                const userfindCondition = {
                    _id:mongoose.Types.ObjectId(user),
                };
                reputationIncrement=user.reputation-15
                userUpdateCondition = {
                    "reputation":  reputationIncrement,
                }
                let represult = await UserModel.updateOne(userfindCondition,userUpdateCondition)
            }

            let ansfindCondition = {
                _id:mongoose.Types.ObjectId(answerId),
            };
            var answersnew =await AnswerModel.findById(ansfindCondition)
            let usernew= await UserModel.findById(answersnew.user)
            const userfindConditionnew = {
                _id:mongoose.Types.ObjectId(usernew),
            };
            reputationIncrement=usernew.reputation+15
            userUpdateConditionnew = {
                "reputation":  reputationIncrement,
            }
            let represultnew = await UserModel.updateOne(userfindConditionnew,userUpdateConditionnew)

            
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