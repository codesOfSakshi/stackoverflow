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
  commentId: {
    type: String,
  },
  bastAns: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answer",
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
});

module.exports = mongoose.model("questions", questionSchema);

// module.exports = questionModel;
