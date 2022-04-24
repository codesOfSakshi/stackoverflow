const TagModel = require('../models/tag');
const QuestionModel = require('../models/question')

// Get All Tags
exports.getAllTags = async (result) => {
    try{
        const tags = await TagModel.find();
        console.log(tags);

        result(null, tags);
    }
    catch(err){
        result(err);
    }

}

// Get All questions per tag
exports.getTaggedQuestions = async (tagId, result) => {
    try{
        const questions = await QuestionModel.find({'tags.tagId' : tagId});

        console.log(questions);

        if(questions.length > 0){
            result(null, questions);
        }
        else{
            result(null , {status:false});
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
            {$inc: {'numQuestions': 1}}, {returnOriginal:false});

        result(null, {status: true, message: "Num of Questions updated"});
    }
    catch(err){
        result(err);
    }
}


// Search Tag by name
exports.searchTags = async(name, result) => {
    
    console.log("Searching for tags named: ", name)
    try{
        const query = await TagModel.find({'name': {'$regex': name, '$options': 'i'}});

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
    const createdAt = reqBody.createdAt;
    const updatedAt = reqBody.updatedAt;
    const description = reqBody.description;
    const name = reqBody.name;
    const numQuestions = reqBody.numQuestions;

    console.log(reqBody);
    try{
        await TagModel.create({tagId, createdAt, updatedAt, description, name, numQuestions});

        result(null, {status: true, message:"Tag created: ", name});
    }
    catch(err){
        result(err)
    }
}