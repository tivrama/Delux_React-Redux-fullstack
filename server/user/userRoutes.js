var bcrypt = require('bcrypt');
var postmark = require('postmark');

var postmarkClientKey = require('../config/env.js').postmark;
var utils = require('../config/utils.js');
var email = require('../config/email.js');
var foodControl = require('../food/foodController.js');

var userControl = require('./userController.js');

var client = new postmark.Client(postmarkClientKey);

module.exports = function (app) {

  // Creates user account, adds default categories, sends welcome email
  app.route('/signup')
    .post(function (req, res) {
      userControl.doesUserExist(req.body.email).then(function (verifiedUser) {
        if (verifiedUser) {
          console.log('User already exists');
          res.sendStatus(204);
        } else {
          email.sendWelcomeEmail(req.body); // TODO: Use with callback??
          userControl.addUser(req.body).then(function (user) {
            // Add all the standard categories to the new user
            for (let category in foodControl.standardCategories) {
              var food = foodControl.standardCategories[category];
              food.userID = user._id;
              foodControl.addCategory(food);
            }
            console.log('NEW USER CREATED!!');
            var token = utils.generateToken(user); // Generate token
            user = utils.getCleanUser(user); // Removes password from responce
            res.status(201).json({
              user: user,  // Return both user and token
              token: token,
            });
            // res.sendStatus(201);
          });
        }
      });
    });

  // Checks user and password, returns a JWT token
  app.route('/login')
    .post(function (req, res) {
      userControl.getUserLogIn(req.body.email)  // <-- Check username
      .exec(function (err, user) {
        if (err) { throw err; }
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'Username or Password is Wrong',
          });
        }
        bcrypt.compare(req.body.password, user.password, //  <-- check pwd
          function (err, valid) {
            if (!valid) {
              return res.status(404).json({
                error: true,
                message: 'Username or Password is Wrong',
              });
            }
            var token = utils.generateToken(user); // Generate token
            user = utils.getCleanUser(user); // Removes password from responce
            res.json({
              user: user,  // Return both user and token
              token: token,
            });
          });
      });
    });

  // Sends an email with a link to the resetPassword route
  app.route('/forgotPassword')
    .post(function (req, res) {
      userControl.doesUserExist(req.body.email).then(function (verifiedUser) {
        if (!verifiedUser) {
          console.log('Not a verified user');
          res.sendStatus(204);
        } else {
          email.forgotPasswordEmail(verifiedUser, function (err) {
            if (err) {
              console.log('Could not send email: ', err);
              res.sendStatus(204);
            } else {
              res.status(201).json({
                message: 'Email was sent',
              });
            }
          });
        }
      });
    });

  // Currently unprotected route to allow user to reset password.  Link to this route is sent in email
  app.route('/resetPassword')
    .post(function (req, res) {
      userControl.doesUserExist(req.body.email).then(function (verifiedUser) {
        if (!verifiedUser) {
          console.log('Not a verified user');
          res.sendStatus(204);
        } else if (req.body.userID.toString() !== verifiedUser._id.toString()) {
          console.log('User ID does not match email');
          res.sendStatus(204);
        } else {
          userControl.resetPassword(req.body, verifiedUser, function (err) {
            if (err) {
              res.status(204).json({
                message: 'Could not change password',
              });
            } else {
              res.status(201).json({
                message: 'Password Changed',
              });
            }
          });
        }
      });
    });

  // This process is dependent on a "replacementEmail" property being appended to the user in the req from the client
  // Changes user email/username account
  app.route('/changeEmail')
    .post(function (req, res) {
      userControl.doesUserExist(req.body.email).then(function (verifiedUser) {
        if (!verifiedUser) {
          console.log('Not a verified user');
          res.sendStatus(204);
        } else {
          userControl.changeEmail(req.body, verifiedUser, function (err) {
            if (err) {
              res.status(204).json({
                message: 'Could not change email',
              });
            } else {
              res.status(201).json({
                message: 'Email Changed',
              });
            }
          });
        }
      });
    });

//----------------------------------------------------------------------

  // Tests postMark service and API key
  app.route('/testingemail')
    .get(function (req, res) {
      console.log('TEST!:', client);
      client.sendEmail({
        'From': 'hello@gourmandapp.com',
        'To': 'protoluxgourmand@gmail.com',
        'Subject': 'Test Email',
        'TextBody': 'Hello from Gourmand!',
      }, function (error, success) {
        if (error) {
          console.error('Unable to send via postmark: ' + error.message);
          res.send(error);
        }
        console.info('Sent to postmark for delivery: ' + success);
        res.send(success);
      });
    });

};
