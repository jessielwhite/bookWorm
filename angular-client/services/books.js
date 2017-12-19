angular.module("app")
.service("booksService", function($http) {
  this.getBookshelf = function(callback) {
    $http
      .get("/books")
      .then(function({ data }) {
        console.log(data);
        if (callback) {
          callback(data);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  this.addBook = function(book, callback) {
    $http
      .post("/book", { params: { book: book } })
      .then(function({ data }) {
        console.log(data);
        if (callback) {
          callback(data);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
