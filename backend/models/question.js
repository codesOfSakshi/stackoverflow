const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.ObjectId,
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
  upVotes: {type:Array},
  downVotes: {type:Array},
  views: {
    type: Number,
  },
  title: {
    type: String,
    required: false,
  },
  tags: {
    type: Array
  },
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
  comment: {
    type: Array,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "activity",
  },
  score:{
    type: Number,
    default:-1
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }

});

module.exports = mongoose.model("questions", questionSchema);

// module.exports = questionModel;
