var mongoose = require('mongoose');



const AnswerModel = require('../models/answer.js');


class Answer{
   

    static answerActivityDetailForUser = async (req)=>{
        try{
            const userId = req.params.userId;
            const answerId = req.params.answerId;
            const query = {
                user:mongoose.Types.ObjectId(userId),
                _id:mongoose.Types.ObjectId(answerId) 
            }
            let answer = await AnswerModel.findOne(query);
            console.log("answer", answer, query)
            answer = JSON.parse(JSON.stringify(answer));
            if(answer){
                return answer;
            }else{
                return [];
            }
                
        }catch(err){
            console.log(err);
            throw new Error("Error while fetching answers details");
        }
    }

    
}

module.exports.Answer = Answer;