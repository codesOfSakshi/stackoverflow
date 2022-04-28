const mongoose = require("mongoose");

const reputationActionSchema = new mongoose.Schema({
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
    points:{
        type:String,
        required: true,
    },
    gain:{
        type:String,
        required: true,
    }
});


const reputationActionModel = mongoose.model('reputationaction', reputationActionSchema);
module.exports = reputationActionModel;
