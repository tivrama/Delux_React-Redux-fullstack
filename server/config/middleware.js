var path = require('path');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');

var mainRoutes = require('../food/mainRoutes.js');
var userRoutes = require('../user/userRoutes.js');

var secret = require('./env.js').jwtSecret;

module.exports = function (app, express) {
  var userRouter = express.Router();
  var mainRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.resolve(__dirname + '/../../client')));

  app.all('*', function (req, res, next) {
    if (!req.url.match(/\/api\/*/g)) {
      res.sendFile(path.resolve(__dirname + '/../../client/index.html'));
    } else {
      next();
    }
  });

  app.use(expressJwt({secret: secret})
    .unless({path: [
      '/api/user/login',
      '/api/user/signup',
      '/api/user/forgotPassword',
      '/api/user/resetPassword'
      , '/api/[your/api]' // Comment this out when done testing
      , '/api/[your/api]' // Comment this out when done testing
      , '/api/[your/api]', // Comment this out when done testing
    ]})
  );

  //inject routes into Router
  userRoutes(userRouter);
  mainRoutes(mainRouter);

  // authentication middleware used to decode token and made available on the request
  app.use('/api/food', mainRouter);
  app.use('/api/user', userRouter);
};
