const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
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
    commentHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'commentHistory',
    },
    
});

const commentModel = mongoose.model('comment', commentSchema);
module.exports = commentModel;
