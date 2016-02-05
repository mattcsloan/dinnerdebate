angular.module('DashboardCtrl', []).controller('DashboardController', function(Page, $http, $rootScope) {
  var vm = this;

  vm.addCustomData = addCustomData;

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

  vm.user = $rootScope.user

  function checkRecipeOwnership() {
    vm.usersOwnRecipes = [];
    vm.userAddedRecipes = [];
    angular.forEach(vm.userRecipes, function(item) {
      //only add recipes that don't have an alternate source
      if(item.sourceURL == '' && item.source == '') {
        vm.usersOwnRecipes.push(item);
      } else{
        vm.userAddedRecipes.push(item);
      }
    });
  }

  function addCustomData() {
    $http.post('/auth/user/photo', {
      photoUrl: 'https://pbs.twimg.com/profile_images/2581632910/b5v4ux2oijeclln8l3rr.jpeg'
    });
  }

});