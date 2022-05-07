const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.ObjectId,
  //   required: true,
  // },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  upVotes: [{
    type: String,
    ref: "user",
  }],
  downVotes: [{
    type: String,
    ref: "user",
  }],
  views: {
    type: Number,
  },
  title: {
    type: String,
    required: false,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "tags",
  }],
  description: {
    type: String,
    required: false,
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "answers",
  }],
  images: [{
    type: String,
  }],
  userId: {
    type: String,
  },
  commentId: {
    type: String,
  },
  bestAns: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'answer',
  },
  status: {
    type: String,
  },
  badges: {
    type: Array,
  },
  activity: {
    type: String,
  },
  score:{
    type: Number,
    default:-1
  }

});

module.exports = mongoose.model("questions", questionSchema);

// module.exports = questionModel;
