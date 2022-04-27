const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: {type:String,required: true},
    description: {type:String,required: true},
    markedApproved: {type:String,required: true},
    adminApproval: {type:String,required: true},
    tags: {type:Array,required: true},
},
{
    versionKey: false,
    timestamps:true
});

questionSchema.set('toObject', { virtuals: true })
questionSchema.set('toJSON', { virtuals: true })

questionSchema.virtual('id').get(function() {
  return this._id.toString();
});

const questionModel = mongoose.model('question', questionSchema);
module.exports = questionModel;