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
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    action:{
       type: mongoose.Schema.Types.ObjectId,
        ref: "reputationaction",
    },
});


const reputationHistoryModel = mongoose.model('reputationhistory', reputationHistorySchema);
module.exports = reputationHistoryModel;