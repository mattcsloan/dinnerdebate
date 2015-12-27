angular.module('RecipesCtrl', []).controller('RecipesController', function (Page, Recipe) {
  var vm = this;

  Page.setTitle('All Recipes');   
  vm.title = 'All Recipes';

  Recipe.getAll()
    .success(function(data, status) {
      vm.recipes = data;
    })
    .error(function(data, status) {
      console.log("Error retreiving recipes");
    });
});