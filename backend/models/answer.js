const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
    
},
{
    versionKey: false,
    timestamps:true
});

answerSchema.set('toObject', { virtuals: true })
answerSchema.set('toJSON', { virtuals: true })

answerSchema.virtual('id').get(function() {
  return this._id.toString();
});

const answerModel = mongoose.model('answer', answerSchema);
module.exports = answerModel;