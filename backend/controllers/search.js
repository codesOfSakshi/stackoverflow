const { User } = require("../services/user.js");
const ENCRYPT = require("../services/encrypt");
const jwt = require("jsonwebtoken");
const SearchService = require("../services/search");

module.exports = class SearchController {
  static async search(req, resp) {
    const data = {
      type: req.body.type,
      keyword: req.body.keyword,
      searchString: req.body.string,
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
        console.log(data.type);
        break;
      case "exact phrase":
        questions = await SearchService.searchExactPhrase(data);
        console.log(data.type);
        break;
      case "question":
        console.log(data.type);
        break;
      case "answer":
        console.log(data.type);
        break;
      case "isaccepted":
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
