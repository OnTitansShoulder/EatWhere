/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  website: String,
  hotness: Number,
  openTimes: {
    type: Array,
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
restaurantSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Restaurant;
