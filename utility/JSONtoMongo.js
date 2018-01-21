'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Dish = require('../server/models/dish.server.model.js'),
    config = require('../server/config/config.js');

/* Connect to your database */
mongoose.connect(config.db.uri);
/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */
mongoose.connection.collections['dishes'].drop(function(err){
  if(err)
    console.log(err);
  else
    console.log("dishes removed.");
});

fs.readFile('./dishes.json', (err, data) => {
  if(err) throw err;
  let directories = JSON.parse(data).entries;
  directories.forEach(function(directory){
    let entry = new Dish(directory);
    entry.save(function(err){
      if(err) throw err;
    });
  });
  console.log("All entries has been saved.");
});



/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */
