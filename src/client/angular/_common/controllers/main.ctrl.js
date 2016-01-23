angular.module('MainCtrl', []).controller('MainController', function($state, $rootScope, $location, $http, $window, Page) {
  var vm = this;

  vm.Page = Page;
  
  $http.get('/api/navigation')
    .success(function (res) {
      vm.navigation = res
    });

  vm.state = $state;

  vm.date = new Date();

  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
    this.locationSearch = '';
    if (to.redirectTo) {
      evt.preventDefault();
      $state.go(to.redirectTo, params);
      if(to.redirectTo == "recipes.index") {
        this.locationSearch = $location.search();
      }
    } else if (to.external) {
      evt.preventDefault();
      $window.open(to.url, '_self');
    }
  });

  $rootScope.$on('$stateChangeSuccess', function(evt, to, params) {
    if(this.locationSearch) {
      $location.search(this.locationSearch);
    }
  });
});