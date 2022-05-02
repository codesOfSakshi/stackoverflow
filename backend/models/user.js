const mongoose = require('mongoose');
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
    type: String,
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
  bookmark: {
    type: Array,
    default: [],
  },
  questionsAsked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  questionsAnswered: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answer",
  },
  commentCount: {
    type: String,
    // required: true,
  },
  upVotesCount: {
    type: String,
    // required: true,
  },
  downVotesCount: {
    type: String,
    // required: true,
  },
  badges: {
    type: Array,
    // required: true,
  },
  tags: {
    type: Array,
    ref: 'tag',
  },
    title: {type:String,required: true},

});

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

userSchema.virtual('id').get(function() {
  return this._id.toString();
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

