const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  //   required: true,
  // },
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  upVotes: {
    type: Number,
    required: false,
  },
  downVotes: {
    type: Number,
    required: false,
  },
  views: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
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
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  commentId: {
    type: String,
    required: false,
  },
  bastAns: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  badges: {
    type: String,
    required: false,
  },
  activity: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("questions", questionSchema);

// module.exports = questionModel;
