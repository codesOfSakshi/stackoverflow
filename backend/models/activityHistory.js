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
    type:{
        type:String,
        required: true,
    },
    comment:{
        type:String,
        required: true,
    },
    by:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model("activityHistory", userSchema);