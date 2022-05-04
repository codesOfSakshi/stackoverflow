const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    // _id: {
  // type: mongoose.ObjectId,
  // required: true,
  // },
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
