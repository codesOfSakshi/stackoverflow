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
    const response ={};
    try {
      if (
        questionID &&
        (status.toLowerCase() == CONSTANTS.questionApproved ||
          status.toLowerCase() == CONSTANTS.questionRejected)
      ) {
        response.result = await ADMIN.approve({ questionID, status });
        //console.log(response);
        response.success=true;
        response.status=200;
        res.status(200);
        res.send(response);
      } else {
        response.message="Expected questionID and status: " + CONSTANTS.questionRejected +" or " + CONSTANTS.questionApproved;
        response.success=false;
        response.status=400;
        res.status(400);
        res.send(response);
      }
    } catch (err) {
      response.message="Something went wrong: " + err;
        response.success=false;
        response.status=500;
      res.status(500);
      res.send(response);
    }
  }

  static async getAnalytics(req, res) {
    console.log("INSIDE GET ANALYTICS");
    const response = {};
    try {
      response.TodaysQuestions = await ADMIN.getCountOfTodaysQuestions();
      response.MostViewedQuestions = await ADMIN.getMostViewedQuestions();
      response.MostUsedTags = await ADMIN.getMostUsedTags();
      response.HighestReputedUsers = await ADMIN.getHighestedRepUsers();
      response.LowestReputedUsers = await ADMIN.getLowestRepUsers();
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
