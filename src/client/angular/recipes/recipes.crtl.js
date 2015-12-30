angular.module('RecipesCtrl', []).controller('RecipesController', function (Page, Recipe) {
  var vm = this;

  Page.setTitle('Recipes');   
  vm.title = 'Recipes';

  Recipe.getAll()
    .success(function(data, status) {
      vm.recipes = data;
    })
    .error(function(data, status) {
      console.log("Error retreiving recipes");
    });
});