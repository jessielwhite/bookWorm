// import axios from "axios";

var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var mongoose = require("mongoose");

var app = express();
var Book = mongoose.model("Book", {
  text: String
});

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());  
app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.get('/books', function(req, res) {
  // use mongoose to get all todos in the database
  Book.find(function(err, books) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) res.send(err);

    res.json(books); // return all todos in JSON format
    console.log(books.items);
  });
});


// $.ajax({
//   url: "https://www.googleapis.com/books/v1/volumes",
//   data: {
//     format: "json",
//     q: "william faulkner"
//   },
//   error: function(err) {
//     console.error(err);
//   },
//   dataType: "jsonp",
//   success: function(data) {
//     console.log(data.items);
//   },
//   type: "GET"
// });


// axios.fetch("https://www.googleapis.com/books/v1/volumes")
//    .then((response) => {
//   console.log('Successfully fetched response data', response.data.items); // ex.: { user: 'Your User'}
//   console.log(response.status); // ex.: 200
// })
//   .catch(err => {
//     console.log('error fetching API data', err);
//   });

