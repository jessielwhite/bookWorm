angular
  .module("app")

  .component("search", {
    bindings: {
      result: "<"
    },
    controller: function(googleService) {
      this.search = () => {
        googleService.search(this.input, this.result);
      };
    },
    templateUrl: "templates/search.html"
  });
