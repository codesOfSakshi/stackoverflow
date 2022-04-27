const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    createdAt:{
        type:String,
        required: true,
    },
    updatedAt:{
        type:String,
        required: true,
    },
    activity:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'activityHistory',
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
