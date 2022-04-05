const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    title: {type:String,required: true},
    description: {type:String,required: true},
},
{
    versionKey: false,
    timestamps:true
});

commentSchema.set('toObject', { virtuals: true })
commentSchema.set('toJSON', { virtuals: true })

commentSchema.virtual('id').get(function() {
  return this._id.toString();
});

const commentModel = mongoose.model('comment', commentSchema);
module.exports = commentModel;