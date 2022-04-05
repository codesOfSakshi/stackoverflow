const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: {type:String,required: true},
    description: {type:String,required: true},
},
{
    versionKey: false,
    timestamps:true
});

tagSchema.set('toObject', { virtuals: true })
tagSchema.set('toJSON', { virtuals: true })

tagSchema.virtual('id').get(function() {
  return this._id.toString();
});

const tagModel = mongoose.model('tag', tagSchema);
module.exports = tagModel;