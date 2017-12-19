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

  this.removeBook = function(book, callback) {
    $http({
      method: "DELETE",
      url: "/book",
      data: {
        bookId: book._id
      },
      headers: {
        "Content-type": "application/json;charset=utf-8"
      }
    })
     .then(function({ data }) {
        if (callback) {
          callback(data);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});

//Test