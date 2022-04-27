var mongoose = require('mongoose');



const QuestionModel = require('../models/question.js');


class Question{

    static getQuestions = async ({questionIds})=>{
        try{
            const query = {
                "_id": {"$in": questionIds}
            }
            //TODO rushabh populate comment, tagIds, answerIds for every question
            const questions = await QuestionModel.find(query);
            if(questions?.length){
                return questions;
            }else{
                return [];
            }
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while getting questions");
        }
    }

    static getQuestionsById = async (req)=>{
        try{
            const query = {
                question:mongoose.Types.ObjectId(req.params.questionId),
            }
            const questions = await QuestionModel.find(query).then().catch();
            if(questions?.length){
                return questions;
            }else{
                return [];
            }
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while getting questions");
        }
    }


    static addBookmark = async (req)=>{
    try{
        const query = {
            question:mongoose.Types.ObjectId(req.params.questionId),
        }
        const questions = await QuestionModel.find(query).then().catch();
        if(questions?.length){
            return questions;
        }else{
            return [];
        }
    }catch(err){
        console.log(err);
        throw new Error("Some unexpected error occurred while getting questions");
    }
    }

}

module.exports.Question = Question;