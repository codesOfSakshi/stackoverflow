const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reputationHistorySchema = new Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref: 'user',required: true},
    action: {type:mongoose.Schema.Types.ObjectId, ref: 'reputationaction',required: true},
},
{
    versionKey: false,
    timestamps:true
});

reputationHistorySchema.set('toObject', { virtuals: true })
reputationHistorySchema.set('toJSON', { virtuals: true })

reputationHistorySchema.virtual('id').get(function() {
  return this._id.toString();
});

const reputationHistoryModel = mongoose.model('reputationhistory', reputationHistorySchema);
module.exports = reputationHistoryModel;