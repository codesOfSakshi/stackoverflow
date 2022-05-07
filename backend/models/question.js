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
  upVotes: {
    type: Array,
    ref: "user",
  },
  downVotes: {
    type: Array,
    ref: "user",
  },
  views: {
    type: Number,
  },
  title: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    ref: "tag",
  },
  description: {
    type: String,
    required: false,
  },
  answers: {
    type: Array,
    ref: "answer",
  },
  images: {
    type: Array,
  },
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
    type: String,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }

});

module.exports = mongoose.model("questions", questionSchema);

// module.exports = questionModel;
