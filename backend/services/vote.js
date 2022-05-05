var mongoose = require('mongoose');
let QuestionModel = require('../models/question.js');
let AnswerModel = require('../models/answer.js');


class Vote{
    static postVote = async (voteType,questionId,answerId,type,voter)=>{
        let updateCondition = {};
        let resupvote = null;
        let resdownvote = null;
        if(type === 'question'){
            try
            {
                if(voteType === 'Upvote'){
                    let findCondition = {
                        _id:mongoose.Types.ObjectId(questionId),
                    };
                    let getquestion1 = await QuestionModel.findOne(findCondition);
                    let questionparse1 = JSON.parse(JSON.stringify(getquestion1))
                    let userUpvote1 = questionparse1.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let userDownvote1 = questionparse1.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let removeUserDownvote1 = questionparse1.downVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    let allUserUpvote1 = questionparse1.upVotes.filter((user)=>{
                        return(user);
                    })

                    let allUserDownvote1 = questionparse1.downVotes.filter((user)=>{
                        return(user);
                    })
                    
                    if(userUpvote1.length === 0 && userDownvote1.length === 0){
                        updateCondition = {
                            $addToSet:{
                                "upVotes":  voter
                            } 
                        }
                        allUserUpvote1.push(voter)
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

                        allUserUpvote1.push(voter)
                        resupvote = allUserUpvote1;
                        resdownvote = removeUserDownvote1;
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
                        resdownvote = removeUserDownvote1;

                    }
                    let result = await QuestionModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM QUESTION VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
                else{
                    let findCondition = {
                        _id:mongoose.Types.ObjectId(questionId),
                    };
                    let getquestion2 = await QuestionModel.findOne(findCondition);
                    let questionparse2 = JSON.parse(JSON.stringify(getquestion2))
                    let userDownvote2 = questionparse2.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let userUpvote2 = questionparse2.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let removeUserUpvote2 = questionparse2.upVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    let allUserUpvote2 = questionparse2.upVotes.filter((user)=>{
                        return(user);
                    })

                    let allUserDownvote2 = questionparse2.downVotes.filter((user)=>{
                        return(user);
                    })
                    
                    if(userDownvote2.length === 0 && userUpvote2.length === 0){
                        updateCondition = {
                            $addToSet:{
                                "downVotes":  voter
                            }
                        }
                        allUserDownvote2.push(voter)
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
                        allUserDownvote2.push(voter)
                        resupvote = removeUserUpvote2;
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
                        resupvote = removeUserUpvote2;
                        resdownvote = allUserDownvote2;
                    }
                    let result = await QuestionModel.updateOne(findCondition,updateCondition);
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
                    let findCondition = {
                        _id:mongoose.Types.ObjectId(answerId),
                    };
                    let getanswer1= await AnswerModel.findOne(findCondition);
                    let answerparse1 = JSON.parse(JSON.stringify(getanswer1))
                    let userUpvote3 = answerparse1.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let userDownvote3 = answerparse1.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let removeUserDownvote3 = answerparse1.downVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    let allUserUpvote3 = answerparse1.upVotes.filter((user)=>{
                        return(user);
                    })

                    let allUserDownvote3 = answerparse1.downVotes.filter((user)=>{
                        return(user);
                    })

                    
                    if(userUpvote3.length === 0 && userDownvote3.length === 0){
                        updateCondition = {
                            $addToSet:{ "upVotes": voter}
                        }
                        allUserUpvote3.push(voter)
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
                        allUserUpvote3.push(voter)
                        resupvote = allUserUpvote3;
                        resdownvote = removeUserDownvote3;
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
                        resdownvote = removeUserDownvote3;
                    }
                    let result = await AnswerModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM ANSWER VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
                else{
                    let findCondition = {
                        _id:mongoose.Types.ObjectId(answerId),
                    };
                    let getanswer2 = await AnswerModel.findOne(findCondition);
                    let answerparse2 = JSON.parse(JSON.stringify(getanswer2))
                    let userDownvote4 = answerparse2.downVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let userUpvote4 = answerparse2.upVotes.filter((user)=>{
                        if(user===voter){
                            return(user);
                        }
                    })
                    let removeUserUpvote4 = answerparse2.upVotes.filter((user)=>{
                        if(user!=voter){
                            return(user);
                        }
                    })
                    let allUserDownvote4 = answerparse2.downVotes.filter((user)=>{
                        return(user);
                    })
                    let allUserUpvote4 = answerparse2.upVotes.filter((user)=>{
                        return(user);
                    })
                    
                    if(userDownvote4.length === 0 && userUpvote4.length === 0){
                        updateCondition = {
                            $addToSet:{
                                "downVotes":  voter
                            }
                        }
                        allUserDownvote4.push(voter)
                        resupvote = allUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    else if(userDownvote4.length === 0 && userUpvote4.length !== 0){
                        updateCondition = {
                            $addToSet:{
                                "downVotes":  voter,
                            },
                            "upVotes" : removeUserUpvote4
                        }
                        allUserDownvote4.push(voter)
                        resupvote = removeUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    else if(userDownvote4.length != 0 && userUpvote4.length === 0){
                        updateCondition = {
                            "downVotes":  allUserDownvote4,
                        }
                        resupvote = allUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    else{
                        updateCondition = {
                            "downVotes":  allUserDownvote4,
                            "upVotes" : removeUserUpvote4
                        }
                        resupvote = removeUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                    }
                    let result = await AnswerModel.updateOne(findCondition,updateCondition);
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

