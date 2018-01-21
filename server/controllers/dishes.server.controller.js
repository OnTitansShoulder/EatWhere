var mongoose = require('mongoose'),
    Dish = require('../models/dish.server.model.js'),
    request = require('request'),
    coordinatesApi = require('./coordinates.server.controller.js');

exports.search = function (req, res){
  let request = req.body;
  let query = {
    'type': { $in: request.type},
    'style': request.style,
    'price': { $gte: request.lowbound, $lte: request.upbound}
  };
  Dish.find(query).exec(function(err, dishes) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      let data = {
        data: dishes
      }
      console.log(data);
      res.json(data);
    }
  });
};

exports.create = function(req, res) {
  /* Instantiate a Dish */
  var dish = new Dish(req.body);
  console.log(req.body);
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

exports.getCoord = function(req, res) {
  if(req.results) {
    let listing = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }
}
