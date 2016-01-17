angular.module('MainCtrl', []).controller('MainController', function($state, $rootScope, $http, $window, $user, Page) {
  var vm = this;

  vm.Page = Page;
  
  $http.get('/api/navigation')
    .success(function (res) {
      vm.navigation = res
    });

  // $http.get('/auth/user')
  //   .success(function (res) {
  //     vm.user = res;
  //   })
  //   .error(function (res) {
  //     console.log('not logged in');
  //   });

  $user.get()
    .then(function (user) {
      vm.user = user;
    })
    .catch(function (error) {
      console.log('Error getting user', error);
    });

  vm.state = $state;

  vm.date = new Date();

  $rootScope.$on('$stateChangeStart', function(evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault();
      $state.go(to.redirectTo, params)
    } else if (to.external) {
      evt.preventDefault();
      $window.open(to.url, '_self');
    }
  });
});