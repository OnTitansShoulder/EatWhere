
/* Dependencies */
var mongoose = require('mongoose'),
    Dish = require('../models/dish.server.model.js'),
    request = require('request'),
    coordinatesApi = require('./coordinates.server.controller.js');
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update dishs.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the dish(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a dish */
exports.create = function(req, res) {

  /* Instantiate a Dish */
  var dish = new Dish(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    dish.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Then save the dish */
  dish.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(dish);
    }
  });
};

/* Show the current dish */
exports.read = function(req, res) {
  /* send back the dish as json from the request */
  res.json(req.dish);
};

/* Update a dish */
exports.update = function(req, res) {
  var dish = req.dish;

  /* Replace the article's properties with the new properties found in req.body */
  dish.name = req.body.name;
  dish.code = req.body.code;
  dish.address = req.body.address;

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    dish.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Save the article */
  dish.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(dish);
    }
  });
};

/* Delete a dish */
exports.delete = function(req, res) {
  var dish = req.dish;

  /* Remove the article */
  dish.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  })
};

/* Retreive all the directory dishs, sorted alphabetically by dish code */
exports.list = function(req, res) {
  Dish.find().sort('code').exec(function(err, dishs) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(dishs);
    }
  });
};

exports.checkBuilding = function(req, res) {
  Dish.find({code: req.buildingCode}, function(err, dish) {
    if(err) res.status(400).send(err);
    else{
      res.send(dish);
    }
  });
}

/*
  Middleware: find a dish by its ID, then pass it to the next request handler.

  HINT: Find the dish using a mongoose query,
        bind it to the request object as the property 'dish',
        then finally call next
 */
exports.dishByID = function(req, res, next, id) {
  Dish.findById(id).exec(function(err, dish) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.dish = dish;
      next();
    }
  });
};

exports.buildingCode = function(req, res, next, code){
  req.buildingCode = code;
  next();
}
