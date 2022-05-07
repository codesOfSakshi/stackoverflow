const TagModel = require('../models/tag');
const QuestionModel = require('../models/question')

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

// Get All questions per tag
exports.getTaggedQuestions = async (reqBody, result) => {
    try{

        console.log("Sorting as: ", reqBody.filterType)

        let questions;
        
        // Interesting (latest)
        if(reqBody.filterType == 1){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "approved"}).sort({_id: -1});
            console.log("By Interesting:", questions);
        }
        // Hot (Views)
        else if(reqBody.filterType == 2){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "approved"}).sort({views: -1});
            console.log("By Hot:", questions);
        }
        // Score (Upvotes)
        else if(reqBody.filterType == 3){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "approved"}).sort({'upVotes': -1});
            console.log("By Score:", questions);
        }
        // Unanswered
        else if(reqBody.filterType == 4){
            questions = await QuestionModel.find({'tags' : reqBody.tagId, 'status': "approved" , answers: { $size: 0 } }).sort({score:1});
            console.log("By Unanswered:", questions);
        }

        if(questions.length > 0){
            result(null, questions);
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
exports.updateNumQuestions = async(tagId, result) => {

    try{
        await TagModel.findOneAndUpdate({tagId: tagId} , 
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

        result(null, {status: true, message: "Num of Questions updated for: "+tagId});
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