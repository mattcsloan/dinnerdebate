angular.module('RecipesEditCtrl', []).controller('RecipesEditController', function(Page, Recipe, $http, $location, recipeId) {
  var vm = this;

  Page.setTitle('Edit Recipe');   
  vm.title = 'Edit Recipe';
  vm.recipeId = recipeId;
  vm.updateRecipe = updateRecipe;
  vm.deleteRecipe = deleteRecipe;

  Recipe.getOne(recipeId)
    .success(function(data, status) {
      if(data.name === "CastError") {
        vm.recipeTitle = "error";
      } else {
        vm.recipeDetail = data;

        vm.name = vm.recipeDetail.name;
        vm.description = vm.recipeDetail.description;
        vm.key = vm.recipeDetail.key;
        vm.date = vm.recipeDetail.date;
        vm.source = vm.recipeDetail.source;
        vm.prepTime = vm.recipeDetail.prepTime;
        vm.cookTime = vm.recipeDetail.cookTime;
        vm.ingredients = vm.recipeDetail.ingredients;
        vm.directions = vm.recipeDetail.directions;
        vm.pairings = vm.recipeDetail.pairings;
        vm.image = vm.recipeDetail.image;
        vm.servings = vm.recipeDetail.servings;
        vm.tags = vm.recipeDetail.tags;
        vm.categories = vm.recipeDetail.categories;
        vm.featured = vm.recipeDetail.featured;

      }
    })
    .error(function(data, status) {
      alert("Error retreiving recipe");
    });

  function updateRecipe() {
    Recipe.update(recipeId, {
      name: vm.name,
      description: vm.description,
      key: vm.key,
      date: vm.date,
      source: vm.source,
      prepTime: vm.prepTime,
      cookTime: vm.cookTime,
      ingredients: vm.ingredients,
      directions: vm.directions,
      pairings: vm.pairings,
      image: vm.image,
      servings: vm.servings,
      tags: vm.tags,
      categories: vm.categories,
      featured: vm.featured
    });
    $location.url('/recipes/view/' + recipeId);
  }

  function deleteRecipe() {
    Recipe.delete(recipeId);
    $location.url('/recipes');
  }

});