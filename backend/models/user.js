const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required:true},

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