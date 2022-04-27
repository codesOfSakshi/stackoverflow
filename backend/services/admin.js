const QUESTION = require("../models/question");
const TAG = require("../models/tag");
const USER = require("../models/user");

module.exports = class AdminService {
  static async test() {
    return "Hello world!";
  }

  static async approve({ questionID, status }) {
    const query = { _id: questionID };
    const newData = { status };

    const result = await QUESTION.findOneAndUpdate(query, newData, {
      new: true,
    });
    if (result) {
      console.log(result);
      return result;
    } else {
      throw result;
    }
  }

  static async getCountOfTodaysQuestions() {
    console.log("*");
    const query = {
      created_on: {
        $gte: new Date(),
        $lt: new Date(),
      },
    };
    try {
        console.log("*");
      const result = await QUESTION.countDocuments(query);
      console.log("COUNT", result);
      if (result) {
        return result;
      } else {
        throw result;
      }
    } catch (err) {
      throw err;
    }
  }

  // should I get entire object?
  static async getMostViewedQuestions() {
    const query = {};
    try {
        console.log("**");
      const result = await QUESTION.find(query)
        .sort({ views: -1 })
        .limit(10)
        .select("_id");
      console.log(result);
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
        console.log("***");
      const result = await TAGS.find(query)
        .sort({ numQuestions: -1 })
        .limit(10)
        .select("name");
      console.log(result);
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
        console.log("****");
      const result = await TAGS.find(query)
        .sort({ reputation: -1 })
        .limit(10);
      console.log(result);
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
        console.log("*****");
      const result = await TAGS.find(query)
        .sort({ reputation })
        .limit(10);
      console.log(result);
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
