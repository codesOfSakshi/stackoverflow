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
    points:{
        type:String,
        required: true,
    },
    gain:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model("reputationAction", userSchema);