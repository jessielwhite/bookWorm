var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));

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

// let bookSearch = (cb) => {
//   let options = {
//     url: `https://googleapis.com`,
//     headers: {
//       "User-Agent": "request",
//       Authorization: API_KEY
//     }
//   };

//   request(options, (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       cb(res.body);
//     }
//   });
// };


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

