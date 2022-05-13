const TagModel = require('../models/tag');
const QuestionModel = require('../models/question')
const UserModel = require('../models/user')
const { Question } = require("../services/question");
const { User } = require("../services/user");
const {getAllTags} = require("../controllers/tag.controller");

// Get All Tags
exports.getAllTags = async (result) => {
    try{
        const tags = await TagModel.find().sort({numQuestions: -1});
        console.log(tags);

        result(null, tags);
    }
    catch(err){
        result(err);
    }

}


//Get User Tags
exports.getUserTags = async (userId,result) => {
    try{
        const tags = await UserModel.findById({_id:userId},{tagIds:1});
        console.log(tags);

        result(null, tags);
    }
    catch(err){
        result(err);
    }

}


// Get All questions per tag
exports.getTaggedQuestions = async (reqBody, result) => {
    try{

        console.log("Tag: ", reqBody.tagId);
        console.log("Sorting as: ", reqBody.filterType)

        // Get Tag Info for Page
        const tag = await TagModel.findOne({name:reqBody.tagId});

        let questions;
        
        // Interesting (latest)
        if(reqBody.filterType == 1){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "APPROVED"}).populate("user").sort({_id: -1});
            console.log("By Interesting:", questions);
        }
        // Hot (Views)
        else if(reqBody.filterType == 2){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "APPROVED"}).populate("user").sort({views: -1});
            console.log("By Hot:", questions);
        }
        // Score (Upvotes)
        else if(reqBody.filterType == 3){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "APPROVED"}).populate("user").sort({'upVotes': -1});
            console.log("By Score:", questions);
        }
        // Unanswered
        else if(reqBody.filterType == 4){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "APPROVED" , answers: { $size: 0 } }).populate("user").sort({score:1});
            console.log("By Unanswered:", questions);
        }

        if(questions.length > 0){
            result(null, {questions: questions , tag:tag});
        }
        else if(reqBody.filterType == 4)
        {
            result(null, {questions: questions , tag:tag});
        }
        else{
            result(null , {status:false , message:"No Questions for this tag"});
        }
    }
    catch(err){
        result(err);
    }
}


// Update Number of Questions for Tag
exports.updateNumQuestions = async(tagName, result) => {

    try{
        await TagModel.findOneAndUpdate({name: tagName} , 
            {
                $inc: { 'numQuestions': 1, 
                        'numQuestionsToday': 1,
                        'numQuestionsThisWeek': 1 
                },
                $set:{
                    updatedAt:Date.now()
                }
            },  
            {returnOriginal:false});

        result(null, {status: true, message: "Num of Questions updated for: "+tagName});
    }
    catch(err){
        result(err);
    }
}


// Search Tag by name
exports.searchTags = async(name, result) => {
    
    console.log("Searching for tags named: ", name)
    try{
        const query = await TagModel.find({'name': {'$regex': name, '$options': 'i'}}).sort({numQuestions: -1});

        console.log(query);

        if(query.length > 0){
            result(null, query);
        }
        else{
            result(null , {status:false});
        }
    }
    catch(err){
        result(err);
    }
}


// Add (Create) Tag
exports.createTag = async(reqBody, result) => {

    const tagId = reqBody.tagId;
    const description = reqBody.description;
    const name = reqBody.name;
    const numQuestions = 0;
    const numQuestionsToday = 0;
    const numQuestionsThisWeek = 0;


    console.log(reqBody);
    try{
        await TagModel.create({tagId, description, name, numQuestions, numQuestionsToday, numQuestionsThisWeek});

        result(null, {status: true, message:"Tag created: ", name});
    }
    catch(err){
        result(err)
    }
}


// Badge
exports.findBadge = async(reqBody, result) => {

    const userId = reqBody.params.userId;
    try {
        const userObj = {userId};
        console.log(userId)
        const user =await User.getUserById(userId);
        let questions = user.questionsAsked
        const questionObj = {};
        questionObj.questionIds = questions;
        const views = await Question.getScoreById(questionObj);
        console.log("views--------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(views)
        const tags = user.tagIds;

        let badge = new Map();

        if (tags?.length) {
            tags.forEach(tag => {
                if (tag.tagId === "Curious") {
                    const quesAsked = user.questionsAsked.length;
                    if (quesAsked <= 2 && quesAsked>0)
                        badge.set(tag.tagId, "Bronze");
                    else if (quesAsked > 2 && quesAsked < 5)
                        badge.set(tag.tagId, "Silver");
                    else if (quesAsked >= 5)
                        badge.set(tag.tagId, "Gold");
                } else if (tag.tagId === "Helpfulness") {
                    const quesAnswered = user.questionsAnswered.length;
                    if (quesAnswered <= 2 && quesAnswered>0)
                        badge.set(tag.tagId, "Bronze");
                    else if (quesAnswered > 2 && quesAnswered < 5)
                        badge.set(tag.tagId, "Silver");
                    else if (quesAnswered >= 5)
                        badge.set(tag.tagId, "Gold");
                } else if (tag.tagId === "Popular") {
                    const reputation = user.reputation;
                    if (reputation <= 10 && reputation>0)
                        badge.set(tag.tagId, "Bronze");
                    else if (reputation > 10 && reputation < 15)
                        badge.set(tag.tagId, "Silver");
                    else if (reputation >= 15)
                        badge.set(tag.tagId, "Gold");
                } else if (tag.tagId === "Sportsmanship") {
                    const upVotes = user.upVotesCount;
                    if (upVotes <= 2 && upVotes>0)
                        badge.set(tag.tagId, "Bronze");
                    else if (upVotes > 2 && upVotes < 5)
                        badge.set(tag.tagId, "Silver");
                    else if (upVotes >= 5)
                        badge.set(tag.tagId, "Gold");
                } else if (tag.tagId === "Critic") {
                    const downVotes = user.downVotesCount;
                    if (downVotes <= 2 && downVotes>0)
                        badge.set(tag.tagId, "Bronze");
                    else if (downVotes > 2 && downVotes < 5)
                        badge.set(tag.tagId, "Silver");
                    else if (downVotes >= 5)
                        badge.set(tag.tagId, "Gold");
                }
                else {
                    if(views>0) {
                        if (views > 5)
                            badge.set("Notable Question", "Gold");

                        if (views > 15)
                            badge.set("Famous Question", "Gold");
                    }

                    if (user.commentCount >= 3)
                        badge.set("Pundit", "Silver");

                    if (tag.score <= 10 && tag.score>0)
                        badge.set(tag.tagId, "Bronze")
                    if (tag.score <= 15 && tag.score>10)
                        badge.set(tag.tagId, "Silver")
                    if (tag.score > 20)
                        badge.set(tag.tagId, "Gold")
                }

            })
            console.log(badge);
            result(null, {status: true, tags: Array.from(badge)});
        }
       else
        result(null, {status: false});
    }
    catch(err){
        result(err)
    }
}