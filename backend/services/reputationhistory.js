var mongoose = require('mongoose');
const ReputationHistoryModel = require('../models/reputationhistory.js');
const reputationHistory={
  UPVOTE_QUESTION:+10,
  DOWNVOTE_QUESTION:-10,
  UPVOTE_ANSWER:+5,
  DOWNVOTE_ANSWER:-5,
  BEST_ANS_MARKED:+15,
  BEST_ANS_UNMARKED:-15
}


class ReputationHistory {
    static getReputationHistoryByUserId = async ({userId})=>{
        try{
            const query = {
                user:mongoose.Types.ObjectId(userId),
            }
            //TODO rushabh sort by date desc
            let reputationHistory = await ReputationHistoryModel.find(query).sort({"createdAt":-1});
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
    static insertReputationHistory= async ({userId,action})=>{
        try{
            console.log(action+"========");
            var reputation = new ReputationHistoryModel({
                createdAt: new Date().toISOString(),
                user:userId,
                action:action,
                gain:reputationHistory[action]
            });
            console.log("================");
            console.log(reputation);
            const reputationHistoryResult = await reputation.save();

        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while posting reputation history by user id");
        }
    }
}

module.exports.ReputationHistory  = ReputationHistory ;