var mongoose = require("mongoose");
const { constants } = require("../config/config");
const TAG = require("../models/tag");

module.exports = class TagService {
  static async test() {
    return "Hello world!";
  }

  static async addTag({ name, description }) {
    //   console.log(name, description);
    if (name && description) {
      const data = new TAG({ name, description });
      const result = await data.save();
    //   console.log(result);
      if (result) return result;
      else throw result;
    } else {
      throw "name or description missing: " + name + " " + description;
    }
  }
};
