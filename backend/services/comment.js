var mongoose = require('mongoose');
const QuestionModel = require('../models/question.js');
const AnswerModel = require('../models/answer.js');


class Comment{
    static postComment = async (answerId,questionId,type,comment)=>{
        if(type === 'question'){
            try{
                
                    const findCondition = {
                        _id:mongoose.Types.ObjectId(questionId),
                    };
                    const updateCondition = {
                        $push: { "commentId": comment }
                    }
                    const result = await QuestionModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM QUESTION COMMENT IS", result);
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
        else{
            try{
                
                const findCondition = {
                    _id:mongoose.Types.ObjectId(answerId),
                };
                const updateCondition = {
                    commentId,
                }
                const result = await AnswerModel.updateOne(findCondition,updateCondition);
                if(result){
                    console.log("RESULT FROM ANSWER COMMENT IS", result);
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
}

module.exports.Comment = Comment;

