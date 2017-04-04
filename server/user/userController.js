var bcrypt = require('bcrypt');

var User = require('./userModel.js');

module.exports = {

  // Given a userID, returns that user
  getUser: function (userID) {
    return User.findOne({'_id': userID}, function (err, user) {
      if (err) {
        console.log('err in controller getUser fn: ', err);
        return err;
      }
      return user;
    });
  },

  // Given a username/email, returns that user
  getUserLogIn: function (email) {
    return User.findOne({'email': email}, function (err, user) {
      if (err) {
        console.log('err in controller getUserLogIn fn: ', err);
        return err;
      }
      return user;
    });
  },

  addUser: function (data) {
    var hash = bcrypt.hashSync(data.password.trim(), 10);
    var newUser = User({
      email: data.email.trim(),
      password: hash,
    });

    return newUser.save(function (err, savedUser) {
      if (err) {
        console.log('err in controller addUser fn: ', err);
        return err;
      }
      console.log('Success saving user to db: ', savedUser);
      return savedUser;
    });
  },

  // Given a username/email, return that user and logs if user exists or not
  doesUserExist: function (email) {
    return User.findOne({'email': email}, function (err, user) {
      if (err) {
        console.log('err in controller getUserLogIn fn: ', err);
        return err;
      }
      if (user) {
        console.log('USER EXISTS!');
        return true;
      } else {
        console.log('USER DOES NOT EXIST!');
        return false;
      }
    });
  },

  // Takes in new password and overwrites old password
  resetPassword: function (newPswd, user, next) {
    var hash = bcrypt.hashSync(newPswd.password.trim(), 10);
    var query = {'_id': user._id};
    return User.update(query, {'password': hash}, null, function (err, savedUser) {
      if (err) {
        console.log('err in controller resetPassword fn: ', err);
        next(err);
        return;
      }
      console.log('Success saving user to db: ', savedUser);
      next();
      return;
    });
  },

  // Takes in new username/email in replacementEmail param and overwrites old username/email
  changeEmail: function (newEmail, user, next) {
    var query = {'_id': user._id};
    return User.update(query, {'email': newEmail.replacementEmail}, null, function (err, savedUser) {
      if (err) {
        console.log('err in controller resetPassword fn: ', err);
        next(err);
        return;
      }
      console.log('Success saving user to db: ', savedUser);
      next();
      return;
    });
  },

};
