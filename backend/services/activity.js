var mongoose = require('mongoose');

const ACTIVITY = require("../models/activity");

module.exports = class ActivityService {
    static async test() {
      return "Hello world!";
    }

    static async getActivities(activityID) {
        const query = { _id: activityID};
        try {
          console.log("Getting activities of", activityID);
          const result = await ACTIVITY.find(query);
        //   console.log(result);
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