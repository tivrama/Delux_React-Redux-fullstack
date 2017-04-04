var postmark = require('postmark');

var postmarkClientKey = require('../config/env.js').postmark;
var client = new postmark.Client(postmarkClientKey);

// This email should be sent on User SignUp after checkougn for duplicate users.
// Possible use: no token or access until responding to email (link to login)
var sendWelcomeEmail = function (user) {  // This Sends Email with template
  client.sendEmailWithTemplate({
    'From': 'hello@yourapp.com',
    'To': user.email,
    'TemplateId': 782101,
    'TemplateModel': {
      'product_name': 'Your App!!!',
      'name': user.email,
      'action_url': 'https://yourapp.com/login', //add /login
      'username': user.email,
      'product_address_line1': 'One Market',
      'product_address_line2': 'San Francisco',
      'sender_name': 'You',
    },
  }, function (error, success) {
    if (error) {
      console.error('Unable to send via postmark: ' + error.message);
      // res.send(error); //res.send not working...
    }
    console.info('Sent to postmark for delivery: ' + success);
    // res.send(success); //res.send not working...
  });
};

// Should send redirect to change pasword screen
var forgotPasswordEmail = function (user, next) {

  client.sendEmailWithTemplate({    //template id 782081
    'From': 'hello@yourapp.com',
    'To': user.email,
    'TemplateId': 782081,
    'TemplateModel': {
      'product_name': 'YourApp',
      'name': user.email,
      'action_url': 'https://YourApp.com/resetPassword?' + user._id,  //add /changePasword
      'sender_name': 'YourApp',
      'product_address_line1': 'One Market',
      'product_address_line2': 'San Francisco',
    },
  }, function (err) {
    if (err) {
      console.log('Could not send welcome email to: ' + user.email);
      console.error(err);
      if (next) {
        next({
          message: 'Could not send welcome email to: ' + user.email,
        });
      }
    } else {
      if (next) {
        next();
      }
    }
  });

};

module.exports = {
  sendWelcomeEmail: sendWelcomeEmail,
  forgotPasswordEmail: forgotPasswordEmail,
};
