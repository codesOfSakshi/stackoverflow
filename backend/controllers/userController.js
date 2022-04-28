const USERSERVICE = require("../services/userService.js");
const ENCRYPT = require("../services/encrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  /* -------------------------------------------------------------------------- */
  /*                               sign in method                               */
  /* -------------------------------------------------------------------------- */
  static async signin(req, resp) {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    const returnMessage = {};

    /* ----- check if all the fields are present or not; if not, return 400 ----- */
    if (!(data.email && data.password) && !resp.headersSent) {
      returnMessage.status = 400;
      returnMessage.success = false;
      returnMessage.message = "All the fields are required";
      return resp.status(404).send(returnMessage);
    }
    const userObj = await USERSERVICE.getUser(data);

    /* ------------ if the return object is null, there is some error ----------- */
    if (!userObj) {
      returnMessage.status = 500;
      returnMessage.success = false;
      returnMessage.message = "Something went wrong!";
      return resp.status(returnMessage.status).send(returnMessage);
    }

    /* ----- if user is not found, return an error with a status code of 401 ---- */
    if (!userObj.userFound) {
      returnMessage.status = 401;
      returnMessage.success = false;
      returnMessage.message = "User does not exist. Please sign up.";
      return resp.status(returnMessage.status).send(returnMessage);
    }

    /* ------------------ found the user; compare the passwords ----------------- */
    const passwordMatch = await ENCRYPT.comparePassword(
      data.password,
      userObj.user.password
    );

    /* -------- if the passwords don't match, return an error code of 401 ------- */
    if (!passwordMatch) {
      returnMessage.status = 401;
      returnMessage.success = false;
      returnMessage.message = "Invalid password";
      return resp.status(returnMessage.status).send(returnMessage);
    }

    const user = JSON.parse(JSON.stringify(userObj.user));
    delete user.password;
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    returnMessage.user = user;
    returnMessage.token = token;
    returnMessage.success = true;
    returnMessage.status = 200;
    returnMessage.message = "Signed in successfully";
    return resp.status(returnMessage.status).send(returnMessage);
  }

  /* -------------------------------------------------------------------------- */
  /*                                signup method                               */
  /* -------------------------------------------------------------------------- */
  static async signup(req, resp) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const returnMessage = {};
    /* ----- check if all the fields are present or not; if not, return 400 ----- */
    if (!(data.email && data.password && data.name) && !resp.headersSent) {
      returnMessage.status = 400;
      returnMessage.success = false;
      returnMessage.message = "All the fields are required";
      return resp.status(returnMessage.status).send(returnMessage);
    }

    const userObj = await USERSERVICE.getUser(data);

    /* ------------ if the return object is null, there is some error ----------- */
    if (!userObj) {
      returnMessage.status = 500;
      returnMessage.success = false;
      returnMessage.message = "Something went wrong!";
      return resp.status(returnMessage.status).send(returnMessage);
    }

    /* ------- if user is found, return an error with a status code of 401 ------ */
    if (userObj.userFound) {
      returnMessage.status = 401;
      returnMessage.success = false;
      returnMessage.message = "User already exists. Please sign in.";
      return resp.status(returnMessage.status).send(returnMessage);
    }

    const encryptedPassword = await ENCRYPT.cryptPassword(data.password);
    data.password = encryptedPassword;

    let user = await USERSERVICE.createUser(data);

    /* ---- if the user is null, there was some error in the service function --- */
    if (!user) {
      returnMessage.status = 500;
      returnMessage.success = false;
      returnMessage.message = "Something went wrong!";
      return resp.status(returnMessage.status).send(returnMessage);
    }

    /* ----------------- create a token and return the response ----------------- */
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    returnMessage.token = token;
    returnMessage.user = user;
    returnMessage.success = true;
    returnMessage.status = 201;
    returnMessage.message = "Signed up successfully!";
    return resp.status(returnMessage.status).send(returnMessage);
  }
};
