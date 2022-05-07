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
        ref: "user",
    },
    downVotes:{
        type:Array,
        ref: "user",
    },
    comment:{
        type:Array,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description:{
        type:String,
        required: true,
    }
});

const answerModel = mongoose.model("answers", answerSchema);
module.exports = answerModel;
