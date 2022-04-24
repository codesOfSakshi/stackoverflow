const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    tagId:{
        type: String,
        required: true,
        unique:true
    },
    createdAt:{
        type:String,
        required: true,
    },
    updatedAt:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
        unique:true
    },
    numQuestions:{
        type:Number,
        required: true,
    }
});

module.exports = mongoose.model("tag", userSchema);