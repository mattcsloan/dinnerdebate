angular.module('RecipesViewCtrl', []).controller('RecipesViewController', function(Page, Recipe, $http, categoryKey, recipeName) {
  var vm = this;

  Page.setTitle('View Recipe');   
  vm.title = 'View Recipe';
  vm.categoryKey = categoryKey;
  vm.recipeName = recipeName;

  Recipe.getOne(categoryKey, recipeName)
    .success(function(data, status) {
      if(data.name === "CastError") {
        vm.recipeTitle = "error";
      } else {
        vm.recipeDetail = data;
      }
    })
    .error(function(data, status) {
      alert("Error retreiving recipe");
    });
});