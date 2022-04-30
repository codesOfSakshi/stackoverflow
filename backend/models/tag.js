const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
    // _id: {
    //   type: mongoose.ObjectId,
    //   required: true,
    // },
    createdAt:{
        type:String,
    },
    updatedAt:{
        type:String,
    },
    description:{
        type:String,
    },
    name:{
        type:String,
    },
    numQuestions:{
        type:String,
    }
});

module.exports = mongoose.model('tag', tagSchema);
