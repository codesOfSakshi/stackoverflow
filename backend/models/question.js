const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
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
    views:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    tags:{
        type:Array,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    answers:{
        type:Array,
        ref : 'answer',
    },
    images:{
        type:Array,
        required: true,
    },
    userId:{
        type:String,
        required: true,
    },
    commentId:{
        type:String,
        required: true,
    },
    bastAns:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        required: true,
    },
    badges:{
        type:String,
        required: true,
    },
    activity:{
        type:String,
        required: true,
    },

});

module.exports = mongoose.model("question", questionSchema);

module.exports = questionModel;
