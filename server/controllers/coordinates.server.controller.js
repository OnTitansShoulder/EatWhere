var config = require('../config/config'),
    request = require('request');


var call = function(address){
  var options = {
    key: config.googleMaps.key,
    address: address
  };
  request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    qs: options
    }, function(error, response, body) {
      if(error) {
        return "";
      }
      var data = JSON.parse(body);
      if(!data.results) return "Error";
      return data.results[0].geometry.location;
  });
};

module.exports = function(req, res, next) {
  if(req.body.address) {
    req.results = call(req.body.address);
  }
  next();
};

module.exports.getCoordinates = call;
