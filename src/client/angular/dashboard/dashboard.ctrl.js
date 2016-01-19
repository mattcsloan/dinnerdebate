angular.module('DashboardCtrl', []).controller('DashboardController', function(Page, $http) {
  var vm = this;

  Page.setTitle('Dashboard');   
  vm.title = 'Dashboard';

  $http.get('/api/recipes/by/user')
    .success(function(data) {
      vm.userRecipes = data;
      checkRecipeOwnership();
    })
    .error(function() {
      console.log('error');
    });


  function checkRecipeOwnership() {
    vm.usersOwnRecipes = [];
    vm.userAddedRecipes = [];
    angular.forEach(vm.userRecipes, function(item) {
      //only add recipes that don't have an alternate source
      console.log(item.sourceURL);
      if(item.sourceURL == '' && item.source == '') {
        vm.usersOwnRecipes.push(item);
      } else{
        vm.userAddedRecipes.push(item);
      }
    });
  }

});