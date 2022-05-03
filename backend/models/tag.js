const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    tagId:{
        type: String,
        required: true,
        unique:true
    },
    createdAt:{
        type:Date,
        required: true,
        default: new Date()
    },
    updatedAt:{
        type:Date,
        required: true,
        default: new Date()
    },
    description:{
        type:String,
    },
    name:{
        type:String,
        required: true,
        unique:true
    },
    numQuestions:{
        type:Number,
        required: true,
    },
    numQuestionsToday:{
        type:Number,
        required: true,
    },
    numQuestionsThisWeek:{
        type:Number,
        required: true,
    },

});

module.exports = mongoose.model('tag', tagSchema);
