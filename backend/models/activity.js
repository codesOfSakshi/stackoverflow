const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    activity:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'activityHistory',
    },
    updatedAt:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model("activity", userSchema);