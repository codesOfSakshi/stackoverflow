const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: String,
    // required: true,
  },
  about: {
    type: String,
    // required: true,
  },
  profilePic: {
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
  tagIds: [{
    tagId:{
      type: String
    },
    score:{
      type: Number
    }
  }],
    title: {type:String,required: true},
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.virtual("id").get(function () {
  return this._id.toString();
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
