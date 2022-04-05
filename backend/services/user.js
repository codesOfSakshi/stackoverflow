var mongoose = require('mongoose');



const UserModel = require('../models/user.js');


class User{
    static getBookMarkQuestionIds = async ({userId})=>{
        try{
            const query = {
                user:mongoose.Types.ObjectId(userId),
            }
            let user = await UserModel.findOne(query);
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

    
}

module.exports.User = User;