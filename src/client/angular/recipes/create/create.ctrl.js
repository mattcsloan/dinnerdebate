angular.module('RecipesCreateCtrl', []).controller('RecipesCreateController', function(Page, Recipe, $location) {
  var vm = this;

  Page.setTitle('Create New Recipe');   
  vm.title = 'Create New Recipe';

  vm.addRecipe = addRecipe;

  vm.recipeTitle;
  vm.recipeContent;

  function addRecipe() {
    Recipe.createNew( 
    { 
     name: vm.recipeTitle,
     content: vm.recipeContent
    })
    .success(function (res) {
      $location.url('/recipes/view/' + res._id);
    });
  }

});