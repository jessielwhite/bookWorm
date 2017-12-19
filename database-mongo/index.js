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
  console.log(JSON.stringify(book.volumeInfo.title));
  let newBook = new Book({
    image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : "N/A",
    url: book.volumeInfo.infoLink,
    author: Array.isArray(book.volumeInfo.authors) ? book.volumeInfo.authors[0] : "N/A",
    title: book.volumeInfo.title,
    price: book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : "N/A",
    isbn: Array.isArray(book.volumeInfo.industryIdentifiers) ? book.volumeInfo.industryIdentifiers[0].identifier : "N/A"
  });
  newBook.save();
};

var remove = function(bookId, callback) {
  Book.findByIdAndRemove(bookId, (err, book) => {
    // let response = {
    //   message: "Book successfully deleted",
    //   id: book._id
    // };
    // res.status(200).send(response);
    callback(book);
  });
}

// Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {  
//     // We'll create a simple object to send back with a message and the id of the document that was removed
//     // You can really do this however you want, though.
//     let response = {
//         message: "Todo successfully deleted",
//         id: todo._id
//     };
//     res.status(200).send(response);
// });
module.exports.remove = remove;
module.exports.selectAll = selectAll;
module.exports.add = add;