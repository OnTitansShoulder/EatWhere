
/* Dependencies */
var mongoose = require('mongoose'),
    Restaurant = require('../models/restaurant.server.model.js'),
    request = require('request'),
    coordinatesApi = require('./coordinates.server.controller.js');
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update restaurants.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the restaurant(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a restaurant */
exports.create = function(req, res) {

  /* Instantiate a Restaurant */
  var restaurant = new Restaurant(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    restaurant.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Then save the restaurant */
  restaurant.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(restaurant);
    }
  });
};

/* Show the current restaurant */
exports.read = function(req, res) {
  /* send back the restaurant as json from the request */
  res.json(req.restaurant);
};

/* Update a restaurant */
exports.update = function(req, res) {
  var restaurant = req.restaurant;

  /* Replace the article's properties with the new properties found in req.body */
  restaurant.name = req.body.name;
  restaurant.code = req.body.code;
  restaurant.address = req.body.address;

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    restaurant.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Save the article */
  restaurant.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(restaurant);
    }
  });
};

/* Delete a restaurant */
exports.delete = function(req, res) {
  var restaurant = req.restaurant;

  /* Remove the article */
  restaurant.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  })
};

/* Retreive all the directory restaurants, sorted alphabetically by restaurant code */
exports.list = function(req, res) {
  Restaurant.find().sort('code').exec(function(err, restaurants) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(restaurants);
    }
  });
};

exports.checkBuilding = function(req, res) {
  Restaurant.find({code: req.buildingCode}, function(err, restaurant) {
    if(err) res.status(400).send(err);
    else{
      res.send(restaurant);
    }
  });
}

/*
  Middleware: find a restaurant by its ID, then pass it to the next request handler.

  HINT: Find the restaurant using a mongoose query,
        bind it to the request object as the property 'restaurant',
        then finally call next
 */
exports.restaurantByID = function(req, res, next, id) {
  Restaurant.findById(id).exec(function(err, restaurant) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.restaurant = restaurant;
      next();
    }
  });
};

exports.buildingCode = function(req, res, next, code){
  req.buildingCode = code;
  next();
}
