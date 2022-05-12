import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // _id: {
  // type: mongoose.ObjectId,
  // required: true,
  // },
  createdAt: {
    type: String,
    // required: true,
  },
  updatedAt: {
    type: String,
    // required: true,
  },
  reputation: {
    type: Number,
    // required: true,
  },
  badge: {
    type: String,
    enum: ["NEW", "GOLD", "SILVER", "BRONZE"],
    default: "NEW",
  },

  admin: {
    type: Boolean,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  lastSeen: {
    type: String,
    // required: true,
  },
  reach: {
    type: Number,
    // required: true,
  },
  about: {
    type: String,
    // required: true,
  },
  profilePicture: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  bookmark: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  }],
  questionsAnswered: [{
    questionId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "questions"
    },
    answerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "answers",
    }
  }],
  questionsAsked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  }],
  commentCount: {
    type: String,
    // required: true,
  },
  upVotesCount: [
    {
      type: String,
      // required: true,
    },
  ],
  downVotesCount: [
    {
      type: String,
      // required: true,
    },
  ],
  badges: {
    type: Array,
    // required: true,
  },
title: { type: String },
  tagIds: [
    {
      tagId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        // ref: "tag",
      },
      score: {
        type: Number,
      },
    },
  ],
});

export const UserModel = mongoose.model("userSchema", userSchema);