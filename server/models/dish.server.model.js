/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var dishSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  restaurant: {
    type: String,
    required: true
  },
  type: String,
  offered_time: String,
  style: String,
  price: Number,
  picture: String,
  description: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  ingredients: {
    type: Array,
    required: true,
    default: []
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
dishSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Dish = mongoose.model('Dish', dishSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Dish;
