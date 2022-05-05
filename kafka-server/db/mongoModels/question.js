import mongoose from "mongoose";
import Joi from "joi";


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
  },
  downVotes: {
    type: Array,
  },
  views: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    ref: 'tag',
  },
  description: {
    type: String,
    required: true,
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
    type: String,
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
});

// export const QuestionSchema = questionSchema;



export const Questions = mongoose.model("Question", questionSchema);
// module.exports = questionModel;
