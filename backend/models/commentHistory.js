const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // _id:{
    //     type: mongoose.ObjectId,
    //     required: true,
    // },
    createdAt:{
        type:String,
        required: true,
    },
    updatedAt:{
        type:String,
        required: true,
    },
    data:{
        type:String,
    },
    user:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model("commentHistory", userSchema);