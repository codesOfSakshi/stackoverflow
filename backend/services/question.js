var mongoose = require('mongoose');
const QuestionModel = require('../models/question.js');
const TagModel = require('../models/tag.js');
const AnswerModel = require('../models/answer.js');

class Question{

    static getQuestions = async ({questionIds})=>{
        try{
            const query = {
                "_id": {"$in": questionIds}
            }
            //TODO rushabh populate comment, tagIds, answerIds for every question
            const questions = await QuestionModel.find(query).populate("tags");
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
            //ToDO - Increasing User Reach 

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



static getQuestionsBasedOnId = async (questionId)=>{
    try{
        const query = {
            question:mongoose.Types.ObjectId(questionId),
        }
        var questions =await QuestionModel.findById(questionId).populate("answers");
        // console.log(questions)

        var viewIncrement=questions.views+1
        console.log("Incrementing the view from "+questions.views+" to "+ viewIncrement)
        QuestionModel.findByIdAndUpdate(questionId,{views:viewIncrement})
        
        // var questionsdata=questions._doc
        // questionsdata['tagDetails'] = await Utility.getArrayNestedObjects(questions.tags,TagModel)
        // questionsdata['answersDetails'] = await Utility.getArrayNestedObjects(questions.answers,AnswerModel)
        console.log("tttttttT",questions)
        return questions;    
        // return questions
    }catch(err){
        console.log(err);
        throw new Error("No question found with this Id");
    }
} 

static getQuestionsBasedOnId = async (questionId)=>{
    try{
        const query = {
            question:mongoose.Types.ObjectId(questionId),
        }
        var questions =await QuestionModel.findById(questionId).populate("answers");
        // console.log(questions)

        // var viewIncrement=questions.views+1
        // console.log("Incrementing the view from "+questions.views+" to "+ viewIncrement)
        // QuestionModel.findByIdAndUpdate(questionId,{views:viewIncrement})
        
        // var questionsdata=questions._doc
        // questionsdata['tagDetails'] = await Utility.getArrayNestedObjects(questions.tags,TagModel)
        // questionsdata['answersDetails'] = await Utility.getArrayNestedObjects(questions.answers,AnswerModel)
        // console.log("tttttttT",questions)
        return questions;    
        // return questions
    }catch(err){
        console.log(err);
        throw new Error("No question found with this Id");
    }
} 

static getQuestionsByType = async (type,sortType)=>{
    try{
        console.log(type,sortType)
        var sorting=1;
        var questions;
        if(sortType=="desc"|| sortType==-1){
            sorting=-1
        }   

        if(type=="Interesting" || type==1){
            console.log("here")
            // questions = await QuestionModel.find({}).sort({createdAt: sorting})
            questions = await QuestionModel.find({})
        }
        else if(type=="Hot" || type==2){
            questions = await QuestionModel.find({}).sort({views: sorting})
        }
        else if(type=="Score" || type==3){
             questions = await QuestionModel.find({}).sort({answers: sorting})
        }
        else if(type=="Unanswered" || type==4){
            questions = await QuestionModel.find({ answers: { $size: 0 } }).sort({score:1})
        }
        console.log(questions)

        if(questions?.length){
            return questions;
        }else{
            return [];
        }
    }catch(err){
        console.log(err);
        throw new Error("Some unexpected error occurred while getting "+type+" questions");
    }
}


static addQuestion = async (question)=>{
    try{
        console.log("Pop",question)
        var questionNew = new QuestionModel({
            upvotes:[],
            downvotes:[],
            views:0,
            answers:[],
            images:question.images,
            userId:question.userId,
            title:question.title,
            tags:question.tags,
            description:question.description,
            commentId:"",
            bestAns:"",
            badges:[],
            activity:""
        });
        //ToDO - Append the tag in user tag list
        await questionNew.save();
        return("Question Added")
    }catch(err){
        console.log(err);
        throw new Error("Some unexpected error occurred while getting questions");
    }
}



static editQuestion = async (question)=>{
    try{
        console.log("EDIT",question)
        const result = await QuestionModel.findByIdAndUpdate(question._id,{
            images:question.images,
            title:question.title,
            tags:question.tags,
            description:question.description
        })
        if (result=={}) {
          return res.status(400).send(result.error.details[0].message);
        }
        return("Question Updated")
    }catch(err){
        console.log(err);
        throw new Error("Some unexpected error occurred while getting questions");
    }
}

static updateAnswerId = async (answerId,questionId)=>{
    try{

        const findCondition = {
            _id:mongoose.Types.ObjectId(questionId),
        };
        console.log("==========="+answerId)
        const updateCondition = {
            $push: { "answers": answerId }
        }
        console.log(findCondition);
        const result = await QuestionModel.updateOne(findCondition,updateCondition);
        console.log("Question result is", result);
        if(result){
            return result
        }else{
            return {}; 
        }
    }
    catch(err){
        console.log(err);
        throw new Error("Some unexpected error occurred while updating answer Id");
    }
}

}
module.exports.Question = Question;