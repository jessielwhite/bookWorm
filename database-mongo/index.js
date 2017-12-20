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
  isbn: String,
  isRead: false
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

var update = function(bookId, callback) {
  Book.findById(bookId, (err, book) => {
    if (err) {
      console.log(err);
    } else {
      book.isRead = true;
    }
    callback(book);
  });
}
// // This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.todoId.
// // Find the existing resource by ID
// Todo.findById(req.params.todoId, (err, todo) => {  
//     // Handle any possible database errors
//     if (err) {
//         res.status(500).send(err);
//     } else {
//         // Update each attribute with any possible attribute that may have been submitted in the body of the request
//         // If that attribute isn't in the request body, default back to whatever it was before.
//         todo.title = req.body.title || todo.title;
//         todo.description = req.body.description || todo.description;
//         todo.price = req.body.price || todo.price;
//         todo.completed = req.body.completed || todo.completed;

//         // Save the updated document back to the database
//         todo.save((err, todo) => {
//             if (err) {
//                 res.status(500).send(err)
//             }
//             res.status(200).send(todo);
//         });
//     }
// });
// module.exports.update = update;
module.exports.remove = remove;
module.exports.selectAll = selectAll;
module.exports.add = add;