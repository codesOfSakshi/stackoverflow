var mongoose = require('mongoose');



const UserModel = require('../models/user.js');
const AnswerModel = require('../models/answer.js');


class User{

    static addToBookMark = async (req)=>{
        try{
            const query = {
                user:mongoose.Types.ObjectId(req.params.userId),
            }
            let user = await UserModel.findOne(query);
            const updatedUser = await UserModel.update(query, {
              $push: {
                "bookmarks": req.body.questionId
              }
            });
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while getting bookmark question ids");
        }
    }

    static getBookMarkQuestionIds = async ({userId})=>{
        try{

            const query = {
                user:mongoose.Types.ObjectId(userId),
            }
            let user = await UserModel.findOne(query);
            console.log(user, "user")

            user = JSON.parse(JSON.stringify(user));
            if(user?.bookmarks?.length){
                console.log(user.bookmarks);
                return user.bookmarks;
            }else{
                return [];
            }
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while getting bookmark question ids");
        }
    }

    static getReputation = async ({userId})=>{
        try{
            const query = {
                user:mongoose.Types.ObjectId(userId),
            }
            let user = await UserModel.findOne(query);
            user = JSON.parse(JSON.stringify(user));
            if(user?.reputation){
                return user.reputation;
            }else{
                return 0;
            }
        }catch(err){
            console.log(err);
            throw new Error("Some unexpected error occurred while getting bookmark question ids");
        }
    }

    static editUser =  (req)=>{
        try{
             let user =  UserModel.findOneAndUpdate(
                mongoose.Types.ObjectId(req.params.userId), // query
                {
                    $set: {
                        "profilePicture": req.body.profilePicture,
                        "lastSeen": req.body.lastSeen,
                        "location": req.body.location,
                        "reputation": req.body.reputation,
                        "reach": req.body.reach,
                    },
                    $push: {
                        "questionAsked": req.body.questionAsked,
                        "questionsAnswered": req.body.questionsAnswered,
                      }
                }, // replacement
                {new:true}, // options
                function (err, object) {
                    if (err) {
                        console.warn(err.message);  // returns error if no matching object found
                    } else {
                        console.dir("data", object);
                        return object;
                    }
                }
                );
                
        }catch(err){
            console.log(err);
            throw new Error("Error while updating user details");
        }
    }


    static answerActivityDetailForUser = async (req)=>{
        try{
            const userId = req.params.userId;
            const answerId = req.params.answerId;
            const query = {
                user:mongoose.Types.ObjectId(userId),
                answer:mongoose.Types.ObjectId(answerId) 
            }
            let answer = await AnswerModel.findOne(query);
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

module.exports.User = User;