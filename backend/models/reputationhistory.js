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
    user:{
        type:String,
        required: true,
    },
    action:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model("repuationHistory", userSchema);