var mongoose = require("mongoose");
const async = require("async");
const UserModel = require("../models/user.js");
const AnswerModel = require("../models/answer.js");
const TagModel = require("../models/tag.js");
const QuestionModel = require("../models/question.js");
const { Question } = require("../services/question");

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
      return updatedUser;
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


    static getUserByIdWithQuestion = async ({ userId }) => {
        try {
            const query = {
                user: mongoose.Types.ObjectId(userId),
            };
            let user = await UserModel.findOne(query).populate(["questionsAsked","questionsAnswered.questionId", "questionsAnswered.answerId"])

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

    static getUserQuestionById = async ({ userId }) => {
        try {
            const query = {
                user: mongoose.Types.ObjectId(userId),
            };
            const userObj = userId;
            const user =await User.getUserById(userObj);
            let questionIds = user.questionsAsked
            const questionObj = {};
            questionObj.questionIds = questionIds;
            let response = await Question.getQuestions(questionObj);
            console.log(user, "user");
            response.map(responses=>{
                console.log("responses------------------------>>>>>>>>>>")
                console.log(responses.upVotes)
                console.log(responses.downVotes)
                let up= responses.upVotes===undefined?0:responses.upVotes.length;
                let down= responses.downVotes===undefined?0:responses.downVotes.length;
                console.log(up)
                console.log(down)
                responses['score']=(up-down);
            })

            response = JSON.parse(JSON.stringify(response));

            if (response) {
                return response;
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

    static getUserAnswerQuestionById = async ({ userId }) => {
        try {
            const query = {
                user: mongoose.Types.ObjectId(userId),
            };
            const userObj = userId;
            const user =await User.getUserById(userObj);
            var questionIds = user.questionsAnswered.map(function(obj) { return obj.questionId; });
            var answerIds = user.questionsAnswered.map(function(obj) { return obj.answerId; });
            const questionObj = {};
            questionObj.questionIds = questionIds;
            let response = await Question.getQuestionsWithTagsAndAnswers(questionObj);
            console.log(user, "user");
            response.map(responses=>{
                let up= responses.upVotes===undefined?0:responses.upVotes.length;
                let down= responses.downVotes===undefined?0:responses.downVotes.length;
                responses['score']=(up-down);
                console.log("lets check-------->>>>>>>")
                console.log(answerIds)
                console.log(responses.bestAns)
                if(answerIds.includes(responses.bestAns))
                {
                    responses['best']="true";
                }
                })
            response = JSON.parse(JSON.stringify(response));
            if (response) {
                return response;
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

    static getUserByIdPopulateQuestion = async ({ userId }) => {
        try {
            const query = {
                user: mongoose.Types.ObjectId(userId),
            };
            let user = await UserModel.findOne(query).populate('questionsAsked');
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

  static getUsersByName = async (query) => {
    try{
      let users = await UserModel.find({'name': {'$regex': query, '$options': 'i'}});
      console.log(users, "users upon search");

      users = JSON.parse(JSON.stringify(users));
      if (users?.length) {
        console.log(users);
        return users;
      } else {
        return [];
      }

    }catch(err){
      console.log(err);
      throw new Error("Error while searching for users by name");
    }
    
  };



static topPosts = async(rankBy, type, userID)=>{
  // parent function to handle sorting 
    try {
        const query = {
            user: mongoose.Types.ObjectId(userID),
        }
        const userObj = {userID};
        //console.log(userId)
        let userDetails = await User.getUserByIdWithQuestion(userObj);//await UserModel.findOne(query)
        if (userDetails) {
            if (rankBy == 'score') {
                return this.sortByScore(type, rankBy, userDetails);
            } else if (rankBy == 'date') {
                return this.sortByDate(type, rankBy, userDetails);
            }
        } else {
            return [];
        }
    }
    catch(err){
        console.log(err);
        throw new Error("Error while searching for users by name");
    }
}


static sortByScore = async(type, rankBy, userDetails) =>{
     // Sorts by score: len(upvotes)-len(downvotes)
    
     if (type =='answer'){
         let questionsAnswered = userDetails.questionsAnswered;
         console.log("questionsAnswered", questionsAnswered)
         questionsAnswered.sort(function(a, b){
          var keyA = a.answerId.upVotes.length - a.answerId.downVotes.length,
            keyB = b.answerId.upVotes.length - b.answerId.downVotes.length;
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        }); 

         var questions = questionsAnswered.map(function(obj) { return obj.questionId; });
         return questions;
     }
      else if(type =='question'){
        let questionsAsked = userDetails.questionsAsked;
        var questionIds = questionsAsked.map(function(obj) { return obj._id; });
        const questions = await QuestionModel.find({ '_id': { $in: questionIds }}).lean()
        return this.customSortByVotes(questions);
      } 

      return this.sortAll(rankBy, userDetails)
 
} 


static sortByDate = async(type, rankBy, userDetails) =>{
   /**
   * sorts by latest createdat 
   * */
     if (type ==='question'){
        let questionsAsked = userDetails.questionsAsked;
        var questionIds = questionsAsked.map(function(obj) { return obj._id; });    
        let res = await QuestionModel.find({ '_id': { $in: questionIds }}).sort({createdat: -1});
        
        let answer = JSON.parse(JSON.stringify(res));
        if(answer){
            return answer;
        }else{
            return [];
        }
     }
     else if(type =='answer'){
        let questionsAnswered = userDetails.questionsAnswered;
       questionsAnswered.sort(function(a, b) {
          var keyA = new Date(a.answerId.createdat),
            keyB = new Date(b.answerId.createdat);
          // Compare the 2 dates
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        }); 


       var questions = questionsAnswered.map(function(obj) { return obj.questionId; });
       return questions;

      }
      else{
        return this.sortAll(rankBy, userDetails)
      }
    
}


static sortAll = async(rankBy, userDetails) =>{
  /**
   * sorts all the questions and answers combined based on date or score
   * */
    console.log("here", rankBy, userDetails)

    if(rankBy=='date'){
        let questionsAsked = userDetails.questionsAsked;
        console.log("questionsAsked", questionsAsked)
        var questionIds = questionsAsked.map(function(obj) { return obj._id; });   
        console.log("questionIds", questionIds)
        const questions = await QuestionModel.find({ '_id': { $in: questionIds }}).lean()
        for(const question of questions) {
              question.sortcreatedat = question.createdat;
         }

        const questionWithDate = []
        let questionsAnswered = userDetails.questionsAnswered;
        for(let questionAnswered of questionsAnswered) {

              const tmp = questionAnswered.questionId;
              tmp.sortcreatedat = questionAnswered.answerId.createdat;
              questionWithDate.push(tmp)
         }

        var combined = questions.concat(questionWithDate);

        combined.sort(function(a, b) {
          var keyA = new Date(a.sortcreatedat),
            keyB = new Date(b.sortcreatedat);
          // Compare the 2 dates
          console.log(keyB, keyA)
          if (keyA < keyB) return 1;
          if (keyA > keyB) return -1;
          return 0;
        }); 

        return combined; 
    } 

    else if(rankBy=='score'){
        let questionsAsked = userDetails.questionsAsked;
        var questionIds = questionsAsked.map(function(obj) { return obj._id; });   
        const questions = await QuestionModel.find({ '_id': { $in: questionIds }}).lean()
        
        for(const question of questions) {
              question.score = question.upVotes.length - question.downVotes.length;
         }
         
        let questionsAnswered = userDetails.questionsAnswered;
        const questionWithScore = []
        for(let questionAnswered of questionsAnswered) {

              const tmp = questionAnswered.questionId;
              tmp.score = questionAnswered.answerId.upVotes.length - questionAnswered.answerId.downVotes.length;
              questionWithScore.push(tmp)
         }


        var combined = questions.concat(questionWithScore);
        combined.sort(function(a, b){
          return b.score - a.score;
        }); 
        return combined;
    } 
} 


static customSortByVotes = async(inputArray) =>{
  /**
   * Sorts arrays by larger to smaller difference in upvote and downvote array
   * length 
   * */
     inputArray.sort(function(a, b){
        var keyA = a.upVotes.length - a.downVotes.length,
          keyB = b.upVotes.length - b.downVotes.length;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      }); 
      return inputArray;
    }
}

module.exports.User = User;
