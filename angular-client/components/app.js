angular.module('app')
.controller('AppCtrl', 
  function(booksService) {
    this.books = [];

    booksService.getBookshelf((myBooks) => {
      this.bookshelf = myBooks;
      console.log('bookshelf:', this.bookshelf);
    });
    
    this.updateBooks = books => {
      this.books = books;
      console.log('books searched:', books);
    };
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html'
  });