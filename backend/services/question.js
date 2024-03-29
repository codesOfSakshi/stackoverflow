var mongoose = require("mongoose");
const QuestionModel = require("../models/question.js");
const UserModel = require("../models/user.js");
const TagModel = require("../models/tag.js");
const ActivityModel = require("../models/activity.js");
const AnswerModel = require("../models/answer.js");
const ActivityService = require("./activity.js");
const USER = require("../models/user");
const redisClient = require('./redisservice.js');

class Question {
  static getQuestions = async ({ questionIds }) => {
    try {
      const query = {
        _id: { $in: questionIds },
      };
      //TODO rushabh populate comment, tagIds, answerIds for every question
      const questions = await QuestionModel.find(query).populate("tags");
      if (questions?.length) {
        return questions;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  static getQuestionsWithTagsAndAnswers = async ({ questionIds }) => {
    try {
      const query = {
        _id: { $in: questionIds },
      };
      //TODO rushabh populate comment, tagIds, answerIds for every question
      const questions = await QuestionModel.find(query).populate("tags");
      if (questions?.length) {
        return JSON.parse(JSON.stringify(questions));
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  static getScoreById = async ({ questionIds }) => {
    try {
      let ids = [];

      console.log(ids);
      const query = {
        _id: { $in: questionIds },
      };
      console.log("questionIds");
      console.log(questionIds);
      let questions = await QuestionModel.find(query);
      questions = JSON.parse(JSON.stringify(questions));
      if (questions?.length) {
        let score = 0;
        console.log(questions);
        questions.map((question) => {
          score += question.views;
        });
        return score;
      } else {
        return 0;
      }
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  static getQuestionsById = async (req) => {
    try {
      const query = {
        question: mongoose.Types.ObjectId(req.params.questionId),
      };
      //ToDO - Increasing User Reach

      const questions = await QuestionModel.find(query).then().catch();

      if (questions?.length) {
        return questions;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  static addBookmark = async (req) => {
    try {
      const query = {
        question: mongoose.Types.ObjectId(req.params.questionId),
      };
      const questions = await QuestionModel.find(query).then().catch();
      if (questions?.length) {
        return questions;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  // static getQuestionsBasedOnId = async (questionId) => {
  //   try {
  //     const query = {
  //       question: mongoose.Types.ObjectId(questionId),
  //     };
  //     var questions = await QuestionModel.findById(questionId)
  //       .populate("answers")
  //       .populate("user");
  //     // console.log(questions)

  //     var viewIncrement = questions.views + 1;
  //     console.log(
  //       "Incrementing the view from " + questions.views + " to " + viewIncrement
  //     );
  //     QuestionModel.findByIdAndUpdate(questionId, { views: viewIncrement });

  //     // var questionsdata=questions._doc
  //     // questionsdata['tagDetails'] = await Utility.getArrayNestedObjects(questions.tags,TagModel)
  //     // questionsdata['answersDetails'] = await Utility.getArrayNestedObjects(questions.answers,AnswerModel)
  //     console.log("tttttttT", questions);
  //     return questions;
  //     // return questions
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error("No question found with this Id");
  //   }
  // };

  static getQuestionsBasedOnId = async (questionId) => {
    try {
      const query = {
        question: mongoose.Types.ObjectId(questionId),
      };
      var questions = await QuestionModel.findById(questionId)
        .populate("answers")
        .populate("user");
      console.log(questions);
      var questionUser = questions.user._id;

      var viewIncrement = questions.views + 1;
      console.log(
        "Incrementing the view from " + questions.views + " to " + viewIncrement
      );
      var d = await QuestionModel.findByIdAndUpdate(questionId, {
        views: viewIncrement,
      });
      await UserModel.findOneAndUpdate(
        { _id: questionUser },
        { $inc: { reach: 1 } }
      );

      // var questionsdata=questions._doc
      // questionsdata['tagDetails'] = await Utility.getArrayNestedObjects(questions.tags,TagModel)
      // questionsdata['answersDetails'] = await Utility.getArrayNestedObjects(questions.answers,AnswerModel)
      // console.log("tttttttT",questions)
      return questions;
      // return questions
    } catch (err) {
      console.log(err);
      throw new Error("No question found with this Id");
    }
  };

  static getQuestionsByType = async (type, sortType) => {
    try {
      const query = {
        status: "APPROVED",
      };
      console.log(type, sortType);
      var sorting = 1;
      var questions=[];
      let key = "";
      if (sortType == "desc" || sortType == -1) {
        sorting = -1;
      }

      if (type == "Interesting" || type == 1) {

        if(sorting===1){
          key = "11"; // ascending & interesting
        }else{
          key = "-11" // descending & interesting
        }
        questions = await redisClient.get(key);
        if(questions && questions.length){
          console.log("Questions fetched from redis");
          // console.log(questions);
          return JSON.parse(questions);
        }
      } else if (type == "Hot" || type == 2) {
        if(sorting===1){
          key = "12"; // ascending & hot
        }else{
          key = "-12" // descending & hot
        }
        questions = await redisClient.get(key);
        if(questions && questions.length){
          console.log("Questions fetched from redis");
          // console.log(questions);
          return JSON.parse(questions);
        }
      } else if (type == "Score" || type == 3) {
        if(sorting===1){
          key = "13"; // ascending & score
        }else{
          key = "-13" // descending & score
        }
        questions = await redisClient.get(key);
        if(questions && questions.length){
          console.log("Questions fetched from redis");
          // console.log(questions);
          return JSON.parse(questions);
        }
        } else if (type == "Unanswered" || type == 4) {
         if(sorting===1){
            key = "14"; // ascending & unanswered
          }else{
            key = "-14" // descending & unanswered
          }
          questions = await redisClient.get(key);
          if(questions && questions.length){
            console.log("Questions fetched from redis");
            // console.log(questions);
            return JSON.parse(questions);
          }
      }
      return questions;
      // return questions
    } catch (err) {
      console.log(err);
      throw new Error("No question found with this Id");
    }
  };


  static addQuestion = async (question) => {
    try {
      console.log("Pop", question);
      
      const user = await USER.findById(question.user);
      if (user && user.name) {
        // console.log("Returned User", user);
        var newActivity = new ActivityModel({
          activities: {
            type: "history",
            comment: "asked",
            by: user.name,
          },
        });
        var activityResult = await newActivity.save();
        console.log("Activity", activityResult);
      }
      else{
        console.log("!!Could not create Activity!!")
      }

      var questionNew = new QuestionModel({
        createdAt: new Date().toISOString(),
        upvotes: [],
        downvotes: [],
        views: 0,
        answers: [],
        images: question.images,
        userId: question.user,
        user: question.user,
        title: question.title,
        tags: question.tags,
        description: question.description,
        commentId: "",
        bestAns: null,
        badges: [],
        activity: newActivity._id,
        status:
          question.images && question.images.length == 0
            ? "APPROVED"
            : "PENDING",
      });
      question.tags.map(async(tag)=>{
        await TagModel.findOneAndUpdate({name: tag} , 
          {
              $inc: { 'numQuestions': 1, 
                      'numQuestionsToday': 1,
                      'numQuestionsThisWeek': 1 
              },
              $set:{
                  updatedAt:Date.now()
              }
          },  
          {returnOriginal:false});
      })
      //ToDO - Append the tag in user tag list
      const insertedQuestion = await questionNew.save();
      const updateUserData = {};
      updateUserData.userId = question.user;
      updateUserData.questionId = insertedQuestion._id.toString();
      updateUserData.tags = question.tags;
      const updatedUser = await Question.updateUserOnQuestionAdd(
        updateUserData
      );
      await questionNew.save();
      this.invalidateQuestionCache();
      return insertedQuestion._id.toString();
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  static editQuestion = async (question) => {
    try {
      console.log("EDIT", question);
      const oldQuestion = await QuestionModel.findById(question._id);
      console.log("EDIT old question", oldQuestion);
      const result = await QuestionModel.findByIdAndUpdate(question._id, {
        images: question.images,
        title: question.title,
        tags: question.tags,
        description: question.description,
        status:
          question.images && question.images.length == 0
            ? "APPROVED"
            : "PENDING",
        updatedAt: new Date().toISOString(),
      });

      //ADDING EDIT TO ACTIVITY
      console.log("AFTER UPDATE", result);

      var newActivity = {
        type: "history",
        comment: "edited",
        by: question.userId,
      };

      await ActivityService.updateActivity(result.activity, newActivity);

      const updateUserData = {};
      updateUserData.userId = question.userId;
      updateUserData.questionId = question._id.toString();
      updateUserData.oldTags = oldQuestion.tags;
      updateUserData.newTags = question.tags;
      updateUserData.score =
        oldQuestion?.upVotes?.length - oldQuestion?.downVotes?.length;
      const updatedUser = await Question.updateUserOnQuestionEdit(
        updateUserData
      );
      if (result == {}) {
        return res.status(400).send(result.error.details[0].message);
      }
      this.invalidateQuestionCache();
      return "Question Updated";
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  static editQuestion = async (question) => {
    try {
      console.log("EDIT", question);
      const oldQuestion = await QuestionModel.findById(question._id);
      console.log("EDIT old question", oldQuestion);
      const result = await QuestionModel.findByIdAndUpdate(question._id, {
        images: question.images,
        title: question.title,
        tags: question.tags,
        description: question.description,
        status:
          question.images && question.images.length == 0
            ? "APPROVED"
            : "PENDING",
      });

      //ADDING EDIT TO ACTIVITY
      console.log("AFTER UPDATE", result);

      var newActivity = {
        type: "history",
        comment: "edited",
        by: question.userId,
      };

      await ActivityService.updateActivity(result.activity, newActivity);

      const updateUserData = {};
      updateUserData.userId = question.userId;
      updateUserData.questionId = question._id.toString();
      updateUserData.oldTags = oldQuestion.tags;
      updateUserData.newTags = question.tags;
      updateUserData.score =
        oldQuestion?.upVotes?.length - oldQuestion?.downVotes?.length;
      const updatedUser = await Question.updateUserOnQuestionEdit(
        updateUserData
      );
      if (result == {}) {
        return res.status(400).send(result.error.details[0].message);
      }
      this.invalidateQuestionCache();
      return question._id.toString();
    } catch (err) {
      console.log(err);
      throw new Error("Some unexpected error occurred while getting questions");
    }
  };

  static updateAnswerId = async (answerId, userId, questionId) => {
    try {
      const findCondition = {
        _id: mongoose.Types.ObjectId(questionId),
      };
      console.log("===========" + answerId);
      const updateCondition = {
        $push: { answers: answerId },
      };
      console.log(findCondition);
      const result = await QuestionModel.findOneAndUpdate(
        findCondition,
        updateCondition,
        { returnOriginal: false }
      );

      console.log("Question result is", result);

      const newActivity = {
        type: "answer",
        comment: "score 0",
        by: userId,
      };

      await ActivityService.updateActivity(result.activity, newActivity);

      if (result) {
        return result;
      } else {
        return {};
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while updating answer Id"
      );
    }
  };

  static updateUserOnQuestionAdd = async ({ userId, questionId, tags }) => {
    console.log(questionId);
    try {
      const query = {
        _id: mongoose.Types.ObjectId(userId),
      };
      let user = await UserModel.findOne(query);
      user = JSON.parse(JSON.stringify(user));
      if (user) {
        if (user.questionsAsked && user.questionsAsked.length) {
          user.questionsAsked.push(mongoose.Types.ObjectId(questionId));
        } else {
          user.questionsAsked = [mongoose.Types.ObjectId(questionId)];
        }
        if (user.tagIds && user.tagIds.length) {
          user.tagIds.forEach((eachUserTag) => {
            if (eachUserTag && eachUserTag.tagId) {
              let tagsContainsIndex = tags.indexOf(eachUserTag.tagId);
              if (tagsContainsIndex >= 0) {
                tags.splice(tagsContainsIndex, 1);
              }
            }
          });
        }
        tags.forEach((eachTag) => {
          user.tagIds.push({ tagId: eachTag, score: 0 });
        });
        let findCondition = {
          _id: mongoose.Types.ObjectId(userId),
        };
        let updateCondition = {
          tagIds: user.tagIds,
          questionsAsked: user.questionsAsked,
        };
        console.log(updateCondition);
        let updatedUser = await UserModel.updateOne(
          findCondition,
          updateCondition
        );
        return updatedUser;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while updating user data on question add"
      );
    }
  };

  static updateUserOnQuestionEdit = async ({
    userId,
    questionId,
    oldTags,
    newTags,
    score,
  }) => {
    try {
      const query = {
        _id: mongoose.Types.ObjectId(userId),
      };
      let user = await UserModel.findOne(query);
      user = JSON.parse(JSON.stringify(user));
      console.log(user.tagIds);
      if (user) {
        if (user.tagIds && user.tagIds.length) {
          user.tagIds.forEach((eachUserTag) => {
            if (eachUserTag && eachUserTag.tagId) {
              let oldTagsContainsIndex = oldTags.indexOf(eachUserTag.tagId);
              if (oldTagsContainsIndex >= 0) {
                eachUserTag.score -= score;
              }

              let newTagsContainsIndex = newTags.indexOf(eachUserTag.tagId);
              if (newTagsContainsIndex >= 0) {
                eachUserTag.score += score;
              }
            }
          });
          if (user.tagIds && user.tagIds.length) {
            user.tagIds.forEach((eachUserTag) => {
              if (eachUserTag && eachUserTag.tagId) {
                let tagsContainsIndex = newTags.indexOf(eachUserTag.tagId);
                if (tagsContainsIndex >= 0) {
                  newTags.splice(tagsContainsIndex, 1);
                }
              }
            });
          }
          newTags.forEach((eachTag) => {
            user.tagIds.push({ tagId: eachTag, score: score });
          });
          let findCondition = {
            _id: mongoose.Types.ObjectId(userId),
          };
          let updateCondition = {
            tagIds: user.tagIds,
          };
          console.log(updateCondition);
          let updatedUser = await UserModel.updateOne(
            findCondition,
            updateCondition
          );
          return updatedUser;
        }
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
      throw new Error(
        "Some unexpected error occurred while updating data on question edit"
      );
    }
  };

  static invalidateQuestionCache = ()=>{
    const keys = ["11","-11","12","-12","13","-13","14","-14"];
    keys.forEach(async (eachKey)=>{
      try{
        await redisClient.del(eachKey);
      }catch(e){
        console.log(e);
      }
    })
  }
}

module.exports.Question = Question;
