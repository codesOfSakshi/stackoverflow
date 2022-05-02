const USERMODEL = require("../models/user");
const QUESITONMODEL = require("../models/question");
const ANSWERMODEL = require("../models/answer");

module.exports = class SearchService {
  /**
   *
   * This method searches for a particular tag in the question collection and returns a list of those questions
   * It will get all the questions from the database and return the ones that have the tag AND
   * It will return all the questions or the answers where title or description or comments where the searchString is a substring of them
   * @param keyword, searchString
   * @returns list of questions or null if there is an error
   */
  static async searchByTag({ keyword, searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];
      for (const question of questions) {
        const index = question.tags.findIndex((tag) => {
          return tag.toString().toLowerCase() === keyword.toLowerCase();
        });
        if (index < 0) {
          continue;
        }

        if (
          question.title.toLowerCase().includes(searchString.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          question.tags
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          final_ans.push(question);
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }

      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchByTag and the error is:- \n",
        error
      );
      return null;
    }
  }

  static async searchByUser({ keyword, searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];
      for (const question of questions) {
        if (
          question.userId.toString().toLowerCase() !==
          keyword.toString().toLowerCase()
        ) {
          continue;
        }

        if (
          question.title.toLowerCase().includes(searchString.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          question.tags
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          final_ans.push(question);
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }

      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchTag and the error is",
        error
      );
      return null;
    }
  }

  static async searchExactPhrase({ searchString }) {
    try {
      const questions = await QUESITONMODEL.find().populate("answers").lean();
      // if questions is null or undefined, return null
      if (questions == null) {
        return null;
      }
      let final_ans = [];

      for (const question of questions) {
        if (
          question.title.toLowerCase().includes(searchString.toLowerCase()) ||
          question.description
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          question.tags
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase())
        ) {
          final_ans.push(question);
          continue;
        }

        for (let answer of question.answers) {
          if (
            answer.comment.toLowerCase().includes(searchString.toLowerCase()) ||
            answer.description
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            final_ans.push(question);
            break;
          }
        }
      }
      return final_ans;
    } catch (error) {
      console.log(
        "There was an error in search service searchTag and the error is",
        error
      );
      return null;
    }
  }
};
