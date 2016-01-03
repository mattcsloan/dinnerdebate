angular.module('RecipesViewCtrl', []).controller('RecipesViewController', function(Page, Recipe, $http, categoryKey, recipeName) {
  var vm = this;

  Page.setTitle('View Recipe');   
  vm.title = 'View Recipe';
  vm.categoryKey = categoryKey;
  vm.recipeName = recipeName;

  $http.get('/api/recipes/' + categoryKey + '/' + recipeName)
    .success(function (res) {
      vm.recipeDetail = res;
    });
});