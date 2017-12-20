// import axios from "axios";
require("dotenv").config();

var express = require('express');
var bodyParser = require('body-parser');
var books = require('../database-mongo');
var mongoose = require("mongoose");

var app = express();

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.get('/books', function (req, res) {
  books.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/book', function(req, res) {
  //console.log(req.body);
  books.add(req.body.params.book, function(err, res) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.end("Success!");
    }
  });
});

app.delete("/book", function(req, res) {
  console.log(req.body);
  books.remove(req.body.bookId, function(err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.end("Book successfully removed!");
    }
  });
});

// put request goes here

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("listening on process.env.PORT || 3000!");
});