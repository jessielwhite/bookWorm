var mongoose = require('mongoose');
var config = require('../config.js');
mongoose.connect(config.MONGO_URI);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var bookSchema  = mongoose.Schema({
  image: String,
  url: String,
  author: String,
  title: String,
  price: String,
  isbn: String
});

var Book = mongoose.model('Book', bookSchema);

var selectAll = function(callback) {
  Book.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var add = function(book, callback) {
  console.log(JSON.stringify(book));
  let newBook = new Book({
    image: book.volumeInfo.imageLinks.smallThumbnail,
    url: book.volumeInfo.infoLink,
    author: Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors[0] : "N/A",
    title: book.volumeInfo.title,
    price: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : "N/A",
    isbn: Array.isArray(book.volumeInfo.industryIdentifiers) ? book.volumeInfo.industryIdentifiers[0].identifier : "N/A"
  });
  newBook.save();
};

module.exports.selectAll = selectAll;
module.exports.add = add;