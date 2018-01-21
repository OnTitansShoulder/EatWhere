var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    dishRouter = require('../routes/dishes.server.routes.js'),
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  //connect to database
  mongoose.connect(process.env.$DB | config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());

  /* serve static files */
  app.use('/', express.static(__dirname + '/../../client'));
  /* serve resource files */
  app.use('/public', express.static(__dirname + '/../../public'));
  app.use('/client', express.static(__dirname + '/../../client'));
  /* use the dishes router for requests to the api */
  app.use('/api/dishes/', dishRouter);

  /* server wrapper around Google Maps API to get latitude + longitude coordinates from address */
  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });

  /* go to homepage for all routes not specified */
  app.all('/*', function(req, res) {
    res.sendFile(path.resolve('client/index.html'));
  });

  return app;
};
