/* Dependencies */
var restaurants = require('../controllers/restaurants.server.controller.js'),
    getCoordinates = require('../controllers/coordinates.server.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
// router.route('/')
//   .get(restaurants.search)
//   .post(getCoordinates, restaurants.create);
//
// router.route('/building/:buildingCode')
//   .get(restaurants.checkBuilding);
// /*
//   The ':' specifies a URL parameter.
//  */
// router.route('/:listingId')
//   .get(restaurants.read)
//   .put(getCoordinates, restaurants.update)
//   .delete(restaurants.delete);

/*
  Get the coordinates to use for marking on GoogleMap TODO
*/
// router.route('/checkCoord')
//   .post(getCoordinates, restaurants.getCoord)

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.

  Say we make an example request to '/restaurants/566372f4d11de3498e2941c9'

  The request handler will first find the specific listing using this 'restaurantsById'
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database,
  and bind this listing to the request object.

  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
// router.param('listingId', restaurants.listingByID);
// router.param('buildingCode', restaurants.buildingCode);

module.exports = router;
