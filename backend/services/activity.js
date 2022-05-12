var mongoose = require("mongoose");
const ACTIVITY = require("../models/activity");
const USER = require("../models/user");

module.exports = class ActivityService {
  static async test() {
    return "Hello world!";
  }

  static async getActivities(activityID) {
    const query = { _id: activityID };
    try {
      console.log("Getting activities of", activityID);
      const result = await ACTIVITY.find(query);
      console.log("Recieved result");
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateActivity(activityID, newActivity) {
    const query = { _id: activityID };
    try {
      console.log("NEW ACTIVITY ---------------------------------------------------", newActivity);
      console.log("ADD ACTVITY QUERY", query);
      if(newActivity.type == "answer" || newActivity.type == "comment"|| newActivity.type == "history"){
        const user = await USER.findById(newActivity.by);
        if(user && user.name){
          console.log("Returned User", user);
          newActivity.by = user.name;
        }
        console.log("ANSWER ACTIVITY", newActivity);
      }
      const result = await ACTIVITY.findOneAndUpdate(query, {
        $push: { activities: newActivity },
      });
      console.log("ACTIVITY RESULT", result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

};
