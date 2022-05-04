var mongoose = require('mongoose');
const QuestionModel = require('../models/question.js');
const AnswerModel = require('../models/answer.js');


class Vote{
    static postVote = async (voteType,questionId,answerId,type,voter)=>{
        let updateCondition = {};
        let resupvote = null;
        let resdownvote = null;
        // let query = null;
        // let insertvote = null;
        // let res = null;
        if(type === 'question'){
            try
            {
                if(voteType === 'Upvote'){
                    const findCondition = {
                        _id:mongoose.Types.ObjectId(questionId),
                    };
                    const getquestion1 = await QuestionModel.findOne(findCondition);
                    const questionparse1 = JSON.parse(JSON.stringify(getquestion1))
                    const userUpvote1 = questionparse1.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const userDownvote1 = questionparse1.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const removeUserDownvote1 = questionparse1.downVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    const allUserUpvote1 = questionparse1.upVotes.filter((user)=>{
                        return(user);
                    })

                    const allUserDownvote1 = questionparse1.downVotes.filter((user)=>{
                        return(user);
                    })
                    
                    if(userUpvote1.length === 0 && userDownvote1.length === 0){
                        updateCondition = {
                            $addToSet:{
                                "upVotes":  voter
                            } 
                        }
                        resupvote = allUserUpvote1;
                        resdownvote = allUserDownvote1;
                    }
                    else if(userUpvote1.length === 0 && userDownvote1.length !== 0){
                        updateCondition = {
                            $addToSet:{
                                "upVotes":  voter,
                            },
                            "downVotes" : removeUserDownvote1
                        }
                        resupvote = allUserUpvote1;
                        resdownvote = allUserDownvote1;
                    }
                    else if(userUpvote1.length != 0 && userDownvote1.length === 0){
                        updateCondition = {
                            "upVotes":  allUserUpvote1,
                        }
                        resupvote = allUserUpvote1;
                        resdownvote = allUserDownvote1;
                    }
                    else{
                        updateCondition = {
                            "upVotes":  allUserUpvote1,
                            "downVotes" : removeUserDownvote1
                        }
                        resupvote = allUserUpvote1;
                        resdownvote = allUserDownvote1;

                    }
                    const result = await QuestionModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM QUESTION VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
                else{
                    const findCondition = {
                        _id:mongoose.Types.ObjectId(questionId),
                    };
                    const getquestion2 = await QuestionModel.findOne(findCondition);
                    const questionparse2 = JSON.parse(JSON.stringify(getquestion2))
                    const userDownvote2 = questionparse2.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const userUpvote2 = questionparse2.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const removeUserUpvote2 = questionparse2.upVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    const allUserUpvote2 = questionparse2.upVotes.filter((user)=>{
                        return(user);
                    })

                    const allUserDownvote2 = questionparse2.downVotes.filter((user)=>{
                        return(user);
                    })
                    
                    if(userDownvote2.length === 0 && userUpvote2.length === 0){
                        updateCondition = {
                            $addToSet:{
                                "downVotes":  voter
                            }
                        }
                        resupvote = allUserUpvote2;
                        resdownvote = allUserDownvote2;
                    }
                    else if(userDownvote2.length === 0 && userUpvote2.length !== 0){
                        updateCondition = {
                            $addToSet:{
                                "downVotes":  voter,
                            },
                            "upVotes" : removeUserUpvote2
                        }
                        resupvote = allUserUpvote2;
                        resdownvote = allUserDownvote2;
                    }
                    else if(userDownvote2.length != 0 && userUpvote2.length === 0){
                        updateCondition = {
                            "downVotes":  allUserDownvote2,
                        }
                        resupvote = allUserUpvote2;
                        resdownvote = allUserDownvote2;
                    }
                    else{
                        updateCondition = {
                            "downVotes":  allUserDownvote2,
                            "upVotes" : removeUserUpvote2
                        }
                        resupvote = allUserUpvote2;
                        resdownvote = allUserDownvote2;
                    }
                    const result = await QuestionModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM QUESTION VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
            }
            catch(err){
                console.log(err);
                throw new Error("Some unexpected error occurred while inserting answer");
            }
        }
        else{
            try
            {
                if(voteType === 'Upvote'){
                    const findCondition = {
                        _id:mongoose.Types.ObjectId(answerId),
                    };
                    const getanswer1= await AnswerModel.findOne(findCondition);
                    const answerparse1 = JSON.parse(JSON.stringify(getanswer1))
                    const userUpvote3 = answerparse1.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const userDownvote3 = answerparse1.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const removeUserDownvote3 = answerparse1.downVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    const allUserUpvote3 = answerparse1.upVotes.filter((user)=>{
                        return(user);
                    })

                    const allUserDownvote3 = answerparse1.downVotes.filter((user)=>{
                        return(user);
                    })

                    
                    if(userUpvote3.length === 0 && userDownvote3.length === 0){
                        updateCondition = {
                            $addToSet:{ "upVotes": voter}
                        }
                        resupvote = allUserUpvote3;
                        resdownvote = allUserDownvote3;
                    }
                    else if(userUpvote3.length === 0 && userDownvote3.length !== 0){
                        updateCondition = {
                            $addToSet:{
                                "upVotes":  voter,
                            },
                            "downVotes" : removeUserDownvote3
                        }
                        resupvote = allUserUpvote3;
                        resdownvote = allUserDownvote3;
                    }
                    else if(userUpvote3.length != 0 && userDownvote3.length === 0){
                        updateCondition = {
                            "upVotes":  allUserUpvote3,
                        }
                        resupvote = allUserUpvote3;
                        resdownvote = allUserDownvote3;
                    }
                    else{
                        updateCondition = {
                            "upVotes":  allUserUpvote3,
                            "downVotes" : removeUserDownvote3
                        }
                        resupvote = allUserUpvote3;
                        resdownvote = allUserDownvote3;
                    }
                    const result = await AnswerModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM ANSWER VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
                else{
                    const findCondition = {
                        _id:mongoose.Types.ObjectId(answerId),
                    };
                    const getqanswer2 = await AnswerModel.findOne(findCondition);
                    const answerparse2 = JSON.parse(JSON.stringify(getanswer2))
                    const userDownvote4 = answerparse2.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const userUpvote4 = answerparse2.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    const removeUserUpvote4 = answerparse2.upVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    const allUserDownvote4 = answerparse2.downVotes.filter((user)=>{
                        return(user);
                    })
                    const allUserUpvote4 = answerparse2.downVotes.filter((user)=>{
                        return(user);
                    })
                    
                    if(userDownvote4.length === 0 && userUpvote4.length === 0){
                        const updateCondition = {
                            $addToSet:{
                                "downVotes":  voter
                            }
                        }
                        resupvote = allUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    else if(userDownvote4.length === 0 && userUpvote4.length !== 0){
                        const updateCondition = {
                            $addToSet:{
                                "downVotes":  voter,
                            },
                            "upVotes" : removeUserUpvote4
                        }
                        resupvote = allUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    else if(userDownvote4.length != 0 && userUpvote4.length === 0){
                        const updateCondition = {
                            "downVotes":  allUserDownvote4,
                        }
                        resupvote = allUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    else{
                        const updateCondition = {
                            "downVotes":  allUserDownvote4,
                            "upVotes" : removeUserUpvote4
                        }
                        resupvote = allUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    const result = await AnswerModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM ANSWER VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
            }
            catch(err){
                console.log(err);
                throw new Error("Some unexpected error occurred while inserting answer");
            }
        }
    }
}

module.exports.Vote = Vote;

