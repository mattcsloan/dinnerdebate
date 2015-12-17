angular.module('HomeCtrl', []).controller('HomeController', function(Page) {
  var vm = this;

  Page.setTitle('Home');   
  vm.title = 'Home';
});