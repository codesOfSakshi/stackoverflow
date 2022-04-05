const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reputationActionSchema = new Schema({
    points: {type:Number,required: true},
    gain: {type:Boolean,required: true},
},
{
    versionKey: false,
    timestamps:true
});

reputationActionSchema.set('toObject', { virtuals: true })
reputationActionSchema.set('toJSON', { virtuals: true })

reputationActionSchema.virtual('id').get(function() {
  return this._id.toString();
});

const reputationActionModel = mongoose.model('reputationaction', reputationActionSchema);
module.exports = reputationActionModel;