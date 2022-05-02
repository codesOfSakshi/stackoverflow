const { User } = require("../services/user.js");
const ENCRYPT = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const SearchService = require("../services/search");

module.exports = class SearchController {
  static async search(req, resp) {
    const data = {
      type: req.body.type,
      keyword: req.body.keyword,
      searchString: req.body.string.trim(),
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
  }
};
