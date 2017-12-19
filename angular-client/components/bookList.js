angular.module("app").component("bookList", {
  bindings: {
    bookshelf: "<"
  },
  controller: function(booksService) {
    
  },
  templateUrl: "/templates/book-list.html"
});
