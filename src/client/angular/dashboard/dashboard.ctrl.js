angular.module('DashboardCtrl', []).controller('DashboardController', function(Page, $http) {
  var vm = this;

  Page.setTitle('Dashboard');   
  vm.title = 'Dashboard';

  $http.get('/api/recipes/by/user')
    .success(function(data) {
      console.log(data);
    })
    .error(function() {
      console.log('error');
    });

});