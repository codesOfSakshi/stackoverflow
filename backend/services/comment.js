var mongoose = require("mongoose");
const QuestionModel = require("../models/question.js");
const AnswerModel = require("../models/answer.js");
const ActivityModel = require("../models/activity.js");
const ActivityService = require("./activity.js");
const UserModel = require("../models/user")

class Comment {
  static postComment = async (answerId, questionId, type, comment, user, name) => {
    var updateCon;
    if (type === "question") {
      try {

        var findComments =await UserModel.findById(user);
        console.log("FIND COMMENTS ////", findComments)
        if(findComments.commentCount){
          updateCon = {
            commentCount : findComments.commentCount + 1
          }
        }
        else{
          updateCon = {
            commentCount : 1
          }
        }

        const findCon = {
          _id: mongoose.Types.ObjectId(user),
        };

        const comresult = await UserModel.updateOne(
          findCon,
          updateCondition
        );

        console.log("hkgdalkjga", comresult)

        const findCondition = {
          _id: mongoose.Types.ObjectId(questionId),
        };
        const commentObj ={
          comment: comment,
          user : mongoose.Types.ObjectId(user),
          createdAt: new Date().toISOString(),
          name : name
        }
        const updateCondition = {
          $addToSet: { "comment": commentObj },
        };
        const result = await QuestionModel.findByIdAndUpdate(
          findCondition,
          updateCondition,
          { returnOriginal: false }
        );
        if (result) {
          console.log("RESULT FROM QUESTION COMMENT IS", result);
          // add comment activity

          var newActivity = {
            type: "comment",
            comment: comment,
            by: result.user,
          };

        await ActivityService.updateActivity(result.activity, newActivity);

        return result;
        } else {
          return {};
        }
      } catch (err) {
        console.log(err);
        throw new Error(
          "Some unexpected error occurred while inserting answer"
        );
      }
    } else {
      try {
        const findCondition = {
          _id: mongoose.Types.ObjectId(answerId),
        };
        const commentObj ={
          comment: comment,
          user : mongoose.Types.ObjectId(user),
          createdAt: new Date().toISOString(),
          name : name
        }
        const updateCondition = {
          $addToSet: { "comment": commentObj },
        };
        console.log("comment", comment);
        const result = await AnswerModel.updateOne(
          findCondition,
          updateCondition
        );
        if (result) {
          console.log("RESULT FROM ANSWER COMMENT IS", result);
          return result;
        } else {
          return {};
        }
      } catch (err) {
        console.log(err);
        throw new Error(
          "Some unexpected error occurred while inserting answer"
        );
      }
    }
  };
}



module.exports.Comment = Comment;
