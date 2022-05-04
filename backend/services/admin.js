var mongoose = require("mongoose");
const { constants } = require("../config/config");
const QUESTION = require("../models/question");
const TAGS = require("../models/tag");
const USERS = require("../models/user");

module.exports = class AdminService {
  static async test() {
    return "Hello world!";
  }

  static async approve({ questionID, status }) {
    const query = { _id: questionID };
    const newData = { status };

    console.log(query, newData);
    let result = await QUESTION.findOne(query);

    if (result && result.status.toLowerCase() != constants.questionWaiting) {
      throw "Question already " + result.status;
    } else {
      result = await QUESTION.findOneAndUpdate(query, newData, {
        new: true,
      });

      console.log(result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    }
  }

  static async getCountOfTodaysQuestions() {
    console.log("Getting list of todays question");
    const query = {
      created_on: {
        $gte: new Date(),
        $lt: new Date(),
      },
    };
    try {
      const result = await QUESTION.countDocuments(query);
      //console.log("COUNT", result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

  static async getMostViewedQuestions() {
    const query = {};
    try {
      console.log("Getting most viewed questions");
      const result = await QUESTION.find(query).sort({ views: -1 }).limit(10);
      //console.log(result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

  static async getMostUsedTags() {
    const query = {};
    try {
      console.log("Getting most used tags.");
      const result = await TAGS.find(query)
        .sort({ numQuestions: -1 })
        .limit(10)
        .select("name");
      //console.log(result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

  static async getHighestedRepUsers() {
    const query = {};
    try {
      console.log("Get highest reputed users.");
      const result = await USERS.find(query).sort({ reputation: -1 }).limit(10);
      //console.log(result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

  static async getLowestRepUsers() {
    const query = {};
    try {
      console.log("Get lowest reputed users.");
      const result = await USERS.find(query).sort({ reputation: 1 }).limit(10);
      //console.log(result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

  static async getUnreviewed() {
    const query = { status : constants.questionWaiting};
    try{
      const result = await QUESTION.find(query);
      console.log(result);
      return result;
    }
    catch(err){throw err;}
  }
};
