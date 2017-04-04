//Token Generator Function
//Generate Token using secret from process.env.JWT_SECRET

var jwt = require('jsonwebtoken');

var secret = require('../config/env.js').jwtSecret;

module.exports = {

  generateToken: function (user) {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the
    //app/collections/models
    var u = {
      // name: user.name,
      email: user.email,
      // admin: user.admin,
      _id: user._id.toString(),
      // image: user.image
    };
    return jwt.sign(u, secret, {
      expiresIn: 60 * 60 * 24 * 365, // expires in 365 days
    });
  },

  //this can be tweeked to send client what we want about the user (note that password is omitted.
  getCleanUser: function (user) {
    var u = user.toJSON();
    return {
      _id: u._id,
      // name: u.name,
      // username: u.username,
      email: u.email,
      // admin: u.admin,
      // createdAt: u.createdAt,
      // updatedAt: u.updatedAt,
      // image: u.image,
      // isEmailVerified: u.isEmailVerified
    };
  },

};
