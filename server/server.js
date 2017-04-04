var express = require('express');
var app = express();
var mongoose = require('mongoose');

var middleware = require('./config/middleware.js');
var db = require('./db/db');

// configuration ===========================================

//Set up Middleware and Routes
middleware(app, express);

// connect to mongoDB database
mongoose.connect(db.url);

var port = process.env.PORT || 3000;

app.listen(port);

// App server confirmation
console.log('Your app running on port: ' + port);

// expose app - use for testing
exports = module.exports = app;
