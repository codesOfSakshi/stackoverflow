const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
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
    description:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    numQuestions:{
        type:String,
        required: true,
    }
});

const tagModel = mongoose.model('tag', tagSchema);
module.exports = tagModel;
