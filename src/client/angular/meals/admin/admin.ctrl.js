angular.module('MealsAdminCtrl', []).controller('MealsAdminController', function(Page) {
  var vm = this;

  Page.setTitle('Admin');   
  vm.title = 'Admin';

  vm.day = moment();
});