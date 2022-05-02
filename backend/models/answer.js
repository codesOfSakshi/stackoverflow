const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
<<<<<<< HEAD
  //   _id: {
  //     type: String,
  //     required: true,
  //   },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
  upVotes: {
    type: Array,
    required: true,
  },
  downVotes: {
    type: Array,
    required: true,
  },
  comment: {
    type: Array,
    required: true,
  },
  user: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
=======
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
    upVotes:{
        type:Array,
        required: true,
    },
    downVotes:{
        type:Array,
        required: true,
    },
    comment:{
        type:Array,
        required: true,
    },
    user:{
        type:Array,
        required: true,
    },
    description:{
        type:String,
        required: true,
    }
>>>>>>> origin/master
});

const answerModel = mongoose.model("answer", answerSchema);
module.exports = answerModel;
