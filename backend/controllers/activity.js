const ACTIVITY = require("../services/activity");
const CONSTANTS = require("../config/config.js").constants;

module.exports = class AdminController {
  static async test(req, res) {
    console.log("INSIDE TEST");
    try {
      const response = await ACTIVITY.test();
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

  static async getActivities(req, res) {
    console.log("INSIDE GET ACTIVITIES");
    const {activityID} = req.params;
    const response = {};
    try {
      response.result = await ACTIVITY.getActivities(activityID);
    //   console.log(response);
      response.status=200;
      response.success=true;
      console.log(response);
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