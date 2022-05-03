const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    // _id:{
    //     type: mongoose.ObjectId,
    //     required: true,
    // },
    createdAt:{
        type:String,
    },
    updatedAt:{
        type:String,
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
