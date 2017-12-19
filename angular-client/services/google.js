angular.module('app')
.service('googleService', function($http) {
  this.search = function(query, callback) {
    $http
      .get("https://www.googleapis.com/books/v1/volumes?q=" + query)
      .then(function({ data }) {
        // console.log(data);
        if (callback) {
          callback(data.items);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };
});