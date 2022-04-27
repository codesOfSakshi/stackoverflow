const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    createdAt:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    comment:{
        type:String,
        required: true,
    },
    
    by: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = mongoose.model("activity", activitySchema);