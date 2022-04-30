const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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
    commentHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'commentHistory',
    },
    updatedAt:{
        type:String,
        required: true,
    },
});

const commentModel = mongoose.model('comment', commentSchema);
module.exports = commentModel;
