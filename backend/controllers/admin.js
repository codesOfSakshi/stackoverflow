const ADMIN = require("../services/admin");
const CONSTANTS = require("../config/config.js").constants;

module.exports = class AdminController {
  static async test(req, res) {
    console.log("INSIDE TEST");
    try {
      const response = await ADMIN.test();
      //console.log(response);
      res.send(response);
      res.status(201);
      res.end();
    } catch (err) {
      res.message = "Something went wrong: " + err;
      res.status(500);
      res.end();
    }
  }

  static async approve(req, res) {
    console.log("INSIDE APPROVE");
    const { questionID, status } = req.body;
    try {
      if (
        questionID &&
        (status.toLowerCase() == CONSTANTS.questionApproved ||
          status.toLowerCase() == CONSTANTS.questionRejected)
      ) {
        const response = await ADMIN.approve({ questionID, status });
        //console.log(response);
        res.status(200);
        res.send(response);
      } else {
        res.status(400);
        res.send(
          "Expected questionID and status: " +
            CONSTANTS.questionRejected +
            " or " +
            CONSTANTS.questionApproved
        );
      }
    } catch (err) {
      res.status(500);
      res.send("Something went wrong: " + err);
    }
  }

  static async getAnalytics(req, res) {
    console.log("INSIDE GET ANALYTICS");
    const response = {};
    try {
      response.TodaysQuestions = await ADMIN.getCountOfTodaysQuestions();
      response.MostViewedQuestions = await ADMIN.getMostViewedQuestions();
      response.MostUsedTags = await ADMIN.getMostUsedTags();
      response.HighestReputatedsers = await ADMIN.getHighestedRepUsers();
      response.LowestReputatedUsers = await ADMIN.getLowestRepUsers();
      //console.log(response);
      response.status=200;
      response.success=true;
      res.send(response);
      res.status(200);
      res.end();
    } catch (err) {
      response.message="Something went wrong: " + err;
      response.status=500;
      response.success=false;
      res.send(response);
      res.status(500);
      res.end();
    }
  }

  static async getUnreviewed(req, res) {
    console.log("INSIDE GET UNREVIEWED");
    const response = {};
    try {
      response.result = await ADMIN.getUnreviewed();
      //console.log(response);
      response.status=200;
      response.success=true;
      res.send(response);
      res.status(200);
      res.end();
    } catch (err) {
      response.message="Something went wrong: " + err;
      response.status=500;
      response.success=false;
      res.send(response);
      res.status(500);
      res.end();
    }
  }
};
