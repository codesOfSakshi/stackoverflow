var mongoose = require("mongoose");
const async = require("async");
const UserModel = require("../models/user.js");
const AnswerModel = require("../models/answer.js");
const TagModel = require("../models/tag.js");
const QuestionModel = require("../models/question.js");

class User {
  /* -------------------------------------------------------------------------- */
  /*                     method to get one user using email                     */
  /* -------------------------------------------------------------------------- */
  static async getUser({ email }) {
    const query = { email: email };
    const userObj = {};
    try {
      const result = await UserModel.findOne(query);
      if (result) {
        userObj.userFound = true;
        userObj.user = result;
      } else {
        userObj.userFound = false;
        return userObj;
      }
      return userObj;
    } catch (error) {
      console.log(
        `Could not fetch the user in userService.getUser and the error is: ${error}`
      );
      return null;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                          method to create an user                          */
  /* -------------------------------------------------------------------------- */
  static async createUser({ name, email, password }) {
    const query = {
      name,
      email,
      password,
    };
    let savedUser;
    try {
      const user = new UserModel(query);
      let result = await user.save().then((user) => (savedUser = user));
      return result ? result : {};
    } catch (error) {
      console.log(
        `Could not fetch the user in userService.createUser and the error is: ${error}`
      );
      return null;
    }
  }

  static addToBookMark = async (req) => {
    try {
      const query = {
        user: mongoose.Types.ObjectId(req.params.userId),
      };
      let user = await UserModel.findOne(query);
      const updatedUser = await UserModel.update(query, {
        $push: {
          bookmarks: req.body.questionId,
        },
      });
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while getting bookmark question ids"
      );
    }
  };

  static getUserById = async ({ userId }) => {
    try {
      const query = {
        user: mongoose.Types.ObjectId(userId),
      };
      let user = await UserModel.findOne(query);
      console.log(user, "user");

      user = JSON.parse(JSON.stringify(user));
      if (user) {
        return user;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while getting bookmark question ids"
      );
    }
  };

  static getBookMarkQuestionIds = async ({ userId }) => {
    try {
      const query = {
        _id: mongoose.Types.ObjectId(userId),
      };
      let user = await UserModel.findOne(query);
      console.log(user, "user");

      user = JSON.parse(JSON.stringify(user));
      if (user?.bookmarks?.length) {
        console.log(user.bookmarks);
        return user.bookmarks;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while getting bookmark question ids"
      );
    }
  };

  static getReputation = async ({ userId }) => {
    try {
      const query = {
        user: mongoose.Types.ObjectId(userId),
      };
      let user = await UserModel.findOne(query);
      user = JSON.parse(JSON.stringify(user));
      if (user?.reputation) {
        return user.reputation;
      } else {
        return 0;
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while getting bookmark question ids"
      );
    }
  };

  static editUser = (req) => {
    try {
      let user = UserModel.findOneAndUpdate(
        mongoose.Types.ObjectId(req.params.userId), // query
        {
          $set: {
            profilePicture: req.body.profilePicture,
            lastSeen: req.body.lastSeen,
            location: req.body.location,
            reputation: req.body.reputation,
            reach: req.body.reach,
          },
          $push: {
            questionAsked: req.body.questionAsked,
            questionsAnswered: req.body.questionsAnswered,
          },
        }, // replacement
        { new: true }, // options
        function (err, object) {
          if (err) {
            console.warn(err.message); // returns error if no matching object found
          } else {
            console.dir("data", object);
            return object;
          }
        }
      );
    } catch (err) {
      console.log(err);
      throw new Error("Error while updating user details");
    }
  };

    static editUserPartially =  (req)=>{
        try{
            UserModel.findOneAndUpdate(
                mongoose.Types.ObjectId(req.params.userId), // query
                {
                    $set: {
                        "location": req.body.location,
                        "name": req.body.name,
                        "title": req.body.title
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


  static answerActivityDetailForUser = async (req) => {
    try {
      const userId = req.params.userId;
      const answerId = req.params.answerId;
      const query = {
        user: mongoose.Types.ObjectId(userId),
        answer: mongoose.Types.ObjectId(answerId),
      };
      let answer = await AnswerModel.findOne(query);
      answer = JSON.parse(JSON.stringify(answer));
      if (answer) {
        return answer;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error while fetching answers details");
    }
  };

  static getUserTags = async ({userId},outercb)=>{
     try{
        const query = {
            user:mongoose.Types.ObjectId(userId),
        }
        let user = await UserModel.findOne(query);
        user = JSON.parse(JSON.stringify(user));
        if(user?.tags?.length){
          const tagsCombined = [];
          const tagIds = user.tags.map((eachTag)=>{
              return mongoose.Types.ObjectId(eachTag.id);
          })
          const tagsQuery = {
            user:{"$in":tagIds},
          }
          let tags = await TagModel.find(tagsQuery);
          tags = JSON.parse(JSON.stringify(tags));
          async.each(tagIds,(eachTagId, cb)=>{
                  let tagsObj = {};
                  tagsObj.id = eachTagId;
                  const questionTagQuery = {
                    "tags": eachTagId
                  };
                  QuestionModel.find(questionTagQuery).then((questions)=>{
                    questions = JSON.parse(JSON.stringify(questions));
                    tagsObj.posts = questions.length;
                    let tagDataObj = tags.filter((eachTag)=>{
                      return eachTag._id===eachTagId.toString();
                    });
                    if(tagDataObj && tagDataObj.length){
                      tagDataObj = tagDataObj[0];
                      tagsObj.name = tagDataObj.name;
                    }
                    let tagUserObj = user.tags.filter((eachTag)=>{
                      return eachTag.id===eachTagId.toString();
                    });
                    if(tagUserObj && tagUserObj.length){
                      tagUserObj = tagUserObj[0];
                      tagsObj.score = tagUserObj.score;
                      if(tagsObj.score>=20){
                        tagsObj.color="gold";
                      }else if(tagsObj.score>=15){
                        tagsObj.color="silver";
                      }else if(tagsObj.score>=10){
                        tagsObj.color="bronze";
                      }else{
                        tagsObj.color="";
                      }
                    }
                    console.log(tagsObj);
                    tagsCombined.push(tagsObj);
                    cb(null);       
                  });
          },function(error){
            if(error){
              console.log(error);
              return [];
            }
            else{
              outercb(null,tagsCombined);
            }
          });  
        }else{
            return [];
        }
    }catch(err){
        console.log(err);
        throw new Error("Some unexpected error occurred while getting user tags by user id");
    }
  }

}

module.exports.User = User;
