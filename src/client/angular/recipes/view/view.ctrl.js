angular.module('RecipesViewCtrl', []).controller('RecipesViewController', function(Page, Recipe, $http, recipeId) {
  var vm = this;

  Page.setTitle('View Recipe');   
  vm.title = 'View Recipe';
  vm.recipeId = recipeId;


  $http.get('/api/recipes/' + recipeId)
    .success(function (res) {
      vm.recipeDetail = res;
    });
});