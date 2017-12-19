angular.module('app')
.component('listItem', {
  bindings: {
    item: '<',
  },
  controller: function(booksService) {
    this.addToBookshelf = book => {
      booksService.addBook(book);
    }
  },
  templateUrl: '/templates/list-item.html'
});