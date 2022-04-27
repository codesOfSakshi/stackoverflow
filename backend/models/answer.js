const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var answerSchema = new Schema({
    questionTitle: {type:String,required: true},
    markedApproved: {type:String,required: true},
    questionTags: {type:String,required: true},
    numVotesDate: {type:String,required: true},
    timePosting: {type:String,required: true},
    user: { type: Schema.Types.ObjectId, ref: 'user' },
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



