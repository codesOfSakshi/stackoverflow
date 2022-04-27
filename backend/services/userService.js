const USERMODEL = require("../models/user");

module.exports = class UserService {
  /* -------------------------------------------------------------------------- */
  /*                     method to get one user using email                     */
  /* -------------------------------------------------------------------------- */
  static async getUser({ email }) {
    const query = { email: email };
    const userObj = {};
    try {
      const result = await USERMODEL.findOne(query);
      if (result) {
        userObj.userFound = true;
        userObj.user = result;
      } else {
        userObj.userFound = false;
        return userObj;
      }
      return userObj;
    } catch (error) {
      console.log(
        `Could not fetch the user in userService.getUser and the error is: ${error}`
      );
      return null;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                          method to create an user                          */
  /* -------------------------------------------------------------------------- */
  static async createUser({ name, email, password }) {
    const query = {
      name,
      email,
      password,
    };
    let savedUser;
    try {
      const user = new USERMODEL(query);
      let result = await user.save().then((user) => (savedUser = user));
      return result ? result : {};
    } catch (error) {
      console.log(
        `Could not fetch the user in userService.createUser and the error is: ${error}`
      );
      return null;
    }
  }
};
