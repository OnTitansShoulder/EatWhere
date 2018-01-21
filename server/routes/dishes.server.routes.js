/* Dependencies */
var dishes = require('../controllers/dishes.server.controller.js'),
    getCoordinates = require('../controllers/coordinates.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/search')
  .post(dishes.search);

router.route('/add')
  .post(dishes.create);

module.exports = router;
