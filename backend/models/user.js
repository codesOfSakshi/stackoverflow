const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required:true},
    profilePicture: {type: String, required:false},
    lastSeen: {type: String, required:false},
    location: {type: String, required:false},
    reputation: {type: String, required:false},
    questionAsked: {type: Array, required:false},
    questionsAnswered: {type: Array, required:false},
    reach: {type: String, required:false},
    bookmarks: {type: Array, required:false},

},
{
    versionKey: false,
    timestamps:true
});

userSchema.set('toObject', { virtuals: true })
userSchema.set('toJSON', { virtuals: true })

userSchema.virtual('id').get(function() {
  return this._id.toString();
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

