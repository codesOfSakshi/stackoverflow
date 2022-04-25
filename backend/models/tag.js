const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    tagId:{
        type: String,
        required: true,
        unique:true
    },
    createdAt:{
        type:Date,
        required: true,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        required: true,
        default: Date.now
    },
    description:{
        type:String,
        required: true,
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

module.exports = mongoose.model("tag", userSchema);