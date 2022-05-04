const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    data:{
        type:String,
    },
    user:{
        type:String,
        required: true,
    },
});

module.exports = mongoose.model("commentHistory", userSchema);