"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const User = require('./models/user');
const  { secret_token }  = require("../backend/config/config");

//Setup work and export for the JWT passport strategy
function auth() {
    console.log("inside auth")
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret_token
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            console.log('test',jwt_payload);
            User.findById(user_id, (err, results) => {
                if (err) {
                    console.log("pass err")
                    return callback(err, false);
                }
                if (results) {
                    callback(null, results);
                }
                else {
                    console.log("pas false")
                    callback(null, false);
                }
            });
        })
    )
}


exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });