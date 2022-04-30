const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    createdAt:{
        type:String,
        required: true,
    },
    updatedAt:{
        type:String,
        required: true,
    },
    upVotes:{
        type:Array,
        required: true,
    },
    downVotes:{
        type:Array,
        required: true,
    },
    comment:{
        type:Array,
        required: true,
    },
    user:{
        type:Array,
        required: true,
    },
    description:{
        type:String,
        required: true,
    }
});

const answerModel = mongoose.model('answer', answerSchema);
module.exports = answerModel;
