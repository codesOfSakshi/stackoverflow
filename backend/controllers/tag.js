const TAG = require("../services/tag");
const CONSTANTS = require("../config/config.js").constants;

module.exports = class TagController {
  static async addTag(req, res) {
    console.log("INSIDE TEST");
    let data = req.body;
    let response = {};
    try {
      if (data) {
        const result = await TAG.addTag(data);
        console.log(result);
        response.result = result;
        response.status = 201;
        response.success = true;
        res.send(response);
        res.status(201);
        res.end();
      } else {
        response.message = "Tag creation data missing";
        response.status = 400;
        response.success = false;
        res.send(response);
        res.status(400);
        res.end();
      }
    } catch (err) {
      response.message = "Something went wrong: " + err;
      response.status = 400;
      response.success = false;
      res.send(response);
      res.status(500);
      res.end();
    }
  }
};
