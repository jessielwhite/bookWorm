angular.module("app").component("bookListItem", {
  bindings: {
    book: "<"
  },
  controller: function(booksService) {
    this.removeFromBookshelf = book => {
        booksService.removeBook(book);
    };
  },
  templateUrl: "/templates/book-list-item.html"
});


