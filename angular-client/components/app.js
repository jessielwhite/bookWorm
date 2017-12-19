angular.module('app')
.controller('AppCtrl', 
  function() {
    this.books = [];
    this.updateBooks = books => {
      this.books = books;
      console.log('books', books);
    };
  })
  .component('app', {
    bindings: {},
    controller: 'AppCtrl',
    templateUrl: '/templates/app.html'
  });