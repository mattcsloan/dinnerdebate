angular.module('HomeCtrl', []).controller('HomeController', function(Page) {
  var vm = this;

  Page.setTitle('Home');   
  vm.title = 'Home';
  // vm.viewLogin = false;
  // vm.toggleLogin = toggleLogin;
  
  // function toggleLogin() {
  //   if(vm.viewLogin) {
  //     vm.viewLogin = false;
  //   } else {
  //     vm.viewLogin = true;
  //   }
  // }
});