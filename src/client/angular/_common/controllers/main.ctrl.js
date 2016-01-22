angular.module('MainCtrl', []).controller('MainController', function($state, $rootScope, $http, $window, Page) {
  var vm = this;

  vm.Page = Page;
  
  $http.get('/api/navigation')
    .success(function (res) {
      vm.navigation = res
    });

  vm.state = $state;

  vm.date = new Date();

  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault();
      $state.go(to.redirectTo, params, { location: false })
    } else if (to.external) {
      evt.preventDefault();
      $window.open(to.url, '_self');
    }
  });
});