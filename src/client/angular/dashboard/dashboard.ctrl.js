angular.module('DashboardCtrl', []).controller('DashboardController', function(Page) {
  var vm = this;

  Page.setTitle('Dashboard');   
  vm.title = 'Dashboard';

});