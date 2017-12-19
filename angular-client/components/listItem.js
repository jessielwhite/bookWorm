angular.module('app')
.component('listItem', {
  bindings: {
    item: '<',
  },
  controller: function(booksService) {
    this.addToBookshelf = book => {
      booksService.addBook(book)
       // .get() need get request; not calling addBook's cb!!
    }
  },
  templateUrl: '/templates/list-item.html'
});