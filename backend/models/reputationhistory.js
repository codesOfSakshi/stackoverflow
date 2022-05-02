const mongoose = require("mongoose");

const reputationHistorySchema = new mongoose.Schema({
    // _id:{
    //     type: mongoose.ObjectId,
    //     required: true,
    // },
    createdAt:{
        type:String,
        required: true,
    },
    user:{
        type:String,
        required: true,
    },
    action:{
        type:String,
        required: true,
    },
});


const reputationHistoryModel = mongoose.model('reputationhistory', reputationHistorySchema);
module.exports = reputationHistoryModel;