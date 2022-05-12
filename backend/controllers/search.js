const { User } = require("../services/user.js");
const ENCRYPT = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const SearchService = require("../services/search");
const e = require("express");

module.exports = class SearchController {
  static async searchCustomQuery(req, resp) {
    const response = {};
    try {
      var questions = await SearchService.searchNested();
      response.status = 200;
      response.questions = questions;
      response.count = questions.length;
      resp.status(response.status).send(response);

    } catch (error) {
      console.log("there was an error in SearchController.search\n", error);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = 500;
      resp.status(response.status).send(response);
    }
  }

  static async search(req, resp) {
    const response = {};
    try {
      var questions = await SearchService.searchNested(req.body);
      response.status = 200;
      response.questions = questions;
      response.count = questions?questions.length:0;
      resp.status(response.status).send(response);

    } catch (error) {
      console.log("there was an error in SearchController.search\n", error);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = 500;
      resp.status(response.status).send(response);
    }
  }

  static async searchUsersByName(req, resp) {
    const data = {
      name: req.body.name,
    };
    const response = {};
    try {
      const users = await SearchService.searchUsersByName(data);
      if (users) {
        response.status = 200;
        response.success = true;
        response.message = "Found the users";
        response.count = users.length;
        response.users = users;
      } else {
        response.status = 404;
        response.success = false;
        response.message =
          "There was some error while getting the users from the database";
      }
      resp.status(response.status).send(response);
    } catch (error) {
      console.log(
        "there was an error in SearchController.searchUsersByName\n",
        error
      );
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = 500;
      res.status(response.status).send(response);
    }
  }
};
