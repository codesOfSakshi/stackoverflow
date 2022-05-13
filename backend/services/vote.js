var mongoose = require('mongoose');
let QuestionModel = require('../models/question.js');
let AnswerModel = require('../models/answer.js');
let UserModel = require('../models/user');
const { constants } = require("../config/config");
const {ReputationHistory} = require('../services/reputationhistory');
const tag = require('../models/tag.js');


class Vote{
    static postVote = async (voteType,questionId,answerId,type,voter)=>{
        let updateCondition = {};
        let resupvote = null;
        let resdownvote = null;
        let userUpdateCondition = {};
        var reputationIncrement=null;
        let userfindCondition = {
            _id:mongoose.Types.ObjectId(voter),
        };
        let user= await UserModel.findOne(userfindCondition);

        if(type === 'question'){
            try
            {
                
                if(voteType === 'Upvote'){

                    var findUpvotesCount =await UserModel.findById(voter);
                    if(findUpvotesCount.upVotesCount){
                    console.log("inside upvotescount")
                    var updateCon = {
                        upVotesCount : findUpvotesCount.upVotesCount + 1
                    }
                    }
                    else{
                    console.log("outside upvotescount")
                    
                    var updateCon = {
                        upVotesCount : 1
                    }
                    }
                    const findCon = {
                    _id: mongoose.Types.ObjectId(voter),
                    };

                    const ucountresult = await UserModel.updateOne(
                    findCon,
                    updateCon
                    );



                    const reputationResult = await ReputationHistory.insertReputationHistory({action: "UPVOTE_QUESTION",userId:user.id });
                    let findCondition = {
                        _id:mongoose.Types.ObjectId(questionId),
                    };
                    let getquestion1 = await QuestionModel.findOne(findCondition);
                    let questionparse1 = JSON.parse(JSON.stringify(getquestion1))
                    let tags = questionparse1.tags;
                    let updateValue =[];
                    let tagHistory= new Map();
                    let questionUser= await UserModel.findById(mongoose.Types.ObjectId(questionparse1.user));
                    questionUser=JSON.parse(JSON.stringify(questionUser))
                    questionUser.tagIds.map(userTag=>{
                        tagHistory.set(userTag.tagId, userTag.score)
                    })
                    tags.map(tag=>{
                        if(tagHistory.has(tag))
                        {
                            let val=  tagHistory.get(tag)
                            val++;
                            tagHistory.set(tag,val)
                        }
                        else
                        {
                            tagHistory.set(tag,1)
                        }
                    })

                    tagHistory.forEach((value,key)=>{
                        const pair={
                            "tagId":key,
                            "score":value
                        }
                        updateValue.push(pair);

                    })
                    questionUser = await UserModel.findByIdAndUpdate(mongoose.Types.ObjectId(questionparse1.user),  {tagIds:updateValue}).exec();
                    console.log(questionUser);
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
                        reputationIncrement = user.reputation+10
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
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
                        reputationIncrement = user.reputation + 10
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }
                    else if(userUpvote1.length != 0 && userDownvote1.length === 0){
                        updateCondition = {
                            "upVotes":  allUserUpvote1,
                        }
                        resupvote = allUserUpvote1;
                        resdownvote = allUserDownvote1;
                        reputationIncrement = user.reputation
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }
                    else{
                        updateCondition = {
                            "upVotes":  allUserUpvote1,
                            "downVotes" : removeUserDownvote1
                        }
                        resupvote = allUserUpvote1;
                        resdownvote = removeUserDownvote1;

                    }

                    let represult1 = await UserModel.updateOne(userfindCondition,userUpdateCondition)
                    console.log("represult1", represult1)
                    let result = await QuestionModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM QUESTION VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
                else{


                    var findDownvotesCount =await UserModel.findById(voter);
                    if(findDownvotesCount.downVotesCount){
                    console.log("inside upvotescount1")
                    var updateCon = {
                        downVotesCount : findDownvotesCount.downVotesCount + 1
                    }
                    }
                    else{
                    console.log("outside upvotescount1")
                    
                    var updateCon = {
                        downVotesCount : 1
                    }
                    }
                    const findCon = {
                    _id: mongoose.Types.ObjectId(voter),
                    };

                    const dcountresult = await UserModel.updateOne(
                    findCon,
                    updateCon
                    );



                    const reputationResult = await ReputationHistory.insertReputationHistory({action: "DOWNVOTE_QUESTION",userId:user.id });
                    let findCondition = {
                        _id:mongoose.Types.ObjectId(questionId),
                    };
                    let getquestion2 = await QuestionModel.findOne(findCondition);
                    let questionparse2 = JSON.parse(JSON.stringify(getquestion2))
                    // let user= await UserModel.findOne(userfindCondition);
                    let tags = questionparse2.tags;
                    let updateValue =[];
                    let tagHistory= new Map();
                    let questionUser= await UserModel.findById(mongoose.Types.ObjectId(questionparse2.user));
                    questionUser=JSON.parse(JSON.stringify(questionUser))
                    questionUser.tagIds.map(userTag=>{
                        tagHistory.set(userTag.tagId, userTag.score)
                    })
                    tags.map(tag=>{
                        if(tagHistory.has(tag))
                        {
                            let val=  tagHistory.get(tag)
                            val--;
                            tagHistory.set(tag,val)
                        }
                        else
                        {
                            tagHistory.set(tag,-1)
                        }
                    })

                    tagHistory.forEach((value,key)=>{
                        const pair={
                            "tagId":key,
                            "score":value
                        }
                        updateValue.push(pair);

                    })
                    questionUser = await UserModel.findByIdAndUpdate(mongoose.Types.ObjectId(questionparse2.user),  {tagIds:updateValue}).exec();
                    console.log(questionUser);
                    console.log(user);
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
                        reputationIncrement=user.reputation-10
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
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
                        reputationIncrement=user.reputation-10
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }
                    else if(userDownvote2.length != 0 && userUpvote2.length === 0){
                        updateCondition = {
                            "downVotes":  allUserDownvote2,
                        }
                        resupvote = allUserUpvote2;
                        resdownvote = allUserDownvote2;
                        reputationIncrement=user.reputation
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }
                    else{
                        updateCondition = {
                            "downVotes":  allUserDownvote2,
                            "upVotes" : removeUserUpvote2
                        }
                        resupvote = removeUserUpvote2;
                        resdownvote = allUserDownvote2;
                        reputationIncrement=user.reputation
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }

                    let userfindCondition = {
                        _id:mongoose.Types.ObjectId(voter),
                    };

                    
                    let represult2 = await UserModel.updateOne(userfindCondition,userUpdateCondition)



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


                    var findUpvotesCount =await UserModel.findById(voter);
                    if(findUpvotesCount.upVotesCount){
                    console.log("inside upvotescount")
                    var updateCon = {
                        upVotesCount : findUpvotesCount.upVotesCount + 1
                    }
                    }
                    else{
                    console.log("outside upvotescount")
                    
                    var updateCon = {
                        upVotesCount : 1
                    }
                    }
                    const findCon = {
                    _id: mongoose.Types.ObjectId(voter),
                    };

                    const ucountresult = await UserModel.updateOne(
                    findCon,
                    updateCon
                    );





                    const reputationResult = await ReputationHistory.insertReputationHistory({action: "UPVOTE_ANSWER",userId:user.id });
                    console.log("answer", answerId, type, voter)
                    let findCondition = {
                        _id:mongoose.Types.ObjectId(answerId),
                    };
                    
                    let getanswer1= await AnswerModel.findOne(findCondition);
                    let answerparse1 = JSON.parse(JSON.stringify(getanswer1))
                    console.log("hgkvds", answerparse1)
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
                        reputationIncrement=user.reputation+5
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
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
                        reputationIncrement=user.reputation+5
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }

                    else if(userUpvote3.length != 0 && userDownvote3.length === 0){
                        updateCondition = {
                            "upVotes":  allUserUpvote3,
                        }
                        resupvote = allUserUpvote3;
                        resdownvote = allUserDownvote3;
                        reputationIncrement=user.reputation
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }
                    else{
                        updateCondition = {
                            "upVotes":  allUserUpvote3,
                            "downVotes" : removeUserDownvote3
                        }
                        resupvote = allUserUpvote3;
                        resdownvote = removeUserDownvote3;
                        reputationIncrement=user.reputation
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }

                     let userfindCondition = {
                        _id:mongoose.Types.ObjectId(voter),
                    };

                
                    let represult3 = await UserModel.updateOne(userfindCondition,userUpdateCondition)



                    let result = await AnswerModel.updateOne(findCondition,updateCondition);
                    if(result){
                        console.log("RESULT FROM ANSWER VOTE IS", result);
                        return ({"result":result , "Upvotes" : resupvote, "Downvotes" : resdownvote});
                    }else{
                        return {}; 
                    }
                }
                else{

                    var findDownvotesCount =await UserModel.findById(voter);
                    if(findDownvotesCount.downVotesCount){
                    console.log("inside upvotescount1")
                    var updateCon = {
                        downVotesCount : findDownvotesCount.downVotesCount + 1
                    }
                    }
                    else{
                    console.log("outside upvotescount1")
                    
                    var updateCon = {
                        downVotesCount : 1
                    }
                    }
                    const findCon = {
                    _id: mongoose.Types.ObjectId(voter),
                    };

                    const dcountresult = await UserModel.updateOne(
                    findCon,
                    updateCon
                    );







                    const reputationResult = await ReputationHistory.insertReputationHistory({action: "DOWNVOTE_ANSWER",userId:user.id });
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
                        reputationIncrement=user.reputation-5
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
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
                        reputationIncrement=user.reputation-5
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }
                    else if(userDownvote4.length != 0 && userUpvote4.length === 0){
                        updateCondition = {
                            "downVotes":  allUserDownvote4,
                        }
                        resupvote = allUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                        reputationIncrement=user.reputation
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }
                    else{
                        updateCondition = {
                            "downVotes":  allUserDownvote4,
                            "upVotes" : removeUserUpvote4
                        }
                        resupvote = removeUserUpvote4;
                        resdownvote = allUserDownvote4 ;
                        reputationIncrement=user.reputation
                        userUpdateCondition = {
                            "reputation":  reputationIncrement,
                        }
                    }


                    let userfindCondition = {
                        _id:mongoose.Types.ObjectId(voter),
                    };

                    
                    let represult4 = await UserModel.updateOne(userfindCondition,userUpdateCondition)



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

