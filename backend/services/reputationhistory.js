var mongoose = require('mongoose');
const ReputationHistoryModel = require('../models/reputationhistory.js');


class ReputationHistory {
    static getReputationHistoryByUserId = async ({userId})=>{
        try{
            const query = {
                user:mongoose.Types.ObjectId(userId),
            }
            //TODO rushabh sort by date desc
            let reputationHistory = await ReputationHistoryModel.find(query).populate('action').populate('user').sort({"createdAt":-1});
            reputationHistory = JSON.parse(JSON.stringify(reputationHistory));
            console.log(query);
            console.log(reputationHistory);
            if(reputationHistory?.length){
                return reputationHistory;
            }else{
                return [];
            }
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while getting reputation history by user id");
        }
    }
}

module.exports.ReputationHistory  = ReputationHistory ;