const { User } = require("../services/user.js");
const ENCRYPT = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const SearchService = require("../services/search");
const e = require("express");

module.exports = class SearchController {
  static async search(req, resp) {
    try {
      const data = {
        type: req.body.type,
        keyword: req.body.keyword,
        searchString: req.body.searchString.trim(),
      };
      let questions = {};
      const response = {};
      switch (data.type) {
        case "tag":
          questions = await SearchService.searchByTag(data);
          break;
        case "user":
          data.mongoParameter = "userId";
          questions = await SearchService.searchByUser(data);
          break;
        case "exact phrase":
          questions = await SearchService.searchExactPhrase(data);
          break;
        case "question":
          questions = await SearchService.searchQuestion(data);
          console.log(data.type);
          break;
        case "answer":
          questions = await SearchService.searchAnswer(data);
          break;
        case "isaccepted":
          questions = await SearchService.searchStatus(data);
          console.log(data.type);
          break;
      }

      if (questions) {
        response.status = 200;
        response.questions = questions;
        response.message = `Results for ${data.searchString} tagged with ${data.keyword}`;
        response.count = questions.length;
      } else {
        response.status = 404;
        response.message =
          "There was an erorr in getting the tags with the search string as " +
          data.searchString;
      }

      resp.status(response.status).send(response);
    } catch (error) {
      console.log("there was an error in SearchController.search\n", error);
      response.success = false;
      response.error = "Some error occurred. Please try again later";
      response.status = 500;
      res.status(response.status).send(response);
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
