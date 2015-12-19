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
        vm.recipeTitle = vm.recipeDetail.name;
        vm.recipeContent = vm.recipeDetail.content;
      }
    })
    .error(function(data, status) {
      alert("Error retreiving recipe");
    });

  function updateRecipe() {
    Recipe.update(recipeId, {
      name: vm.recipeTitle,
      content: vm.recipeContent
    });
    $location.url('/recipes/view/' + recipeId);
  }

  function deleteRecipe() {
    Recipe.delete(recipeId);
    $location.url('/recipes');
  }

});