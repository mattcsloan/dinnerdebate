angular.module('RecipesCreateCtrl', []).controller('RecipesCreateController', function(Page, Recipe, $location) {
  var vm = this;

  Page.setTitle('Create New Recipe');   
  vm.title = 'Create New Recipe';

  vm.addRecipe = addRecipe;

  vm.recipeTitle;

  function addRecipe() {
    vm.recipeDate = Date.now();
    Recipe.createNew( 
    { 
      name: vm.recipeTitle,
      description: vm.recipeDescription,
      key: vm.recipeKey,
      date: vm.recipeDate,
      source: vm.recipeSource,
      prepTime: vm.recipePrepTime,
      cookTime: vm.recipeCookTime,
      ingredients: vm.recipeIngredients,
      directions: vm.recipeDirections,
      pairings: vm.recipePairings,
      image: vm.recipeImage,
      servings: vm.recipeServings,
      tags: vm.recipeTags,
      categories: vm.recipeCategories,
      featured: vm.recipeFeatured
    })
    .success(function (res) {
      $location.url('/recipes/view/' + res._id);
    });
  }

});