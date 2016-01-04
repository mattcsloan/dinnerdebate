angular.module('RecipesEditCtrl', []).controller('RecipesEditController', function(Page, Recipe, $location, categoryKey, recipeName) {
  var vm = this;

  Page.setTitle('Edit Recipe');   
  vm.title = 'Edit Recipe';

  vm.updateRecipe = updateRecipe;
  vm.deleteRecipe = deleteRecipe;
  vm.addIngredient = addIngredient;
  vm.removeIngredient = removeIngredient;
  vm.addTag = addTag;
  vm.removeTag = removeTag;

  vm.categoryOptions = [
    "Appetizers",
    "Breads and Muffins",
    "Breakfast",
    "Cakes",
    "Cookies",
    "Desserts",
    "Drinks",
    "Entrees",
    "Kids",
    "Pies",
    "Pets",
    "Salads",
    "Sauces and Marinades",
    "Sides",
    "Soups"
  ]

  Recipe.getOne(categoryKey, recipeName)
    .success(function(data, status) {
      if(data.name === "CastError") {
        vm.recipeTitle = "error";
      } else {
        vm.recipeDetail = data;

        vm.name = vm.recipeDetail.name;
        vm.key = vm.recipeDetail.key;
        vm.description = vm.recipeDetail.description;
        vm.category = vm.recipeDetail.category;
        vm.categoryKey = vm.recipeDetail.categoryKey;
        vm.date = vm.recipeDetail.date;
        vm.source = vm.recipeDetail.source;
        vm.addedBy = vm.recipeDetail.addedBy;
        vm.prepTime = vm.recipeDetail.prepTime;
        vm.cookTime = vm.recipeDetail.cookTime;
        vm.ingredients = vm.recipeDetail.ingredients;
        vm.directions = vm.recipeDetail.directions;
        vm.pairings = vm.recipeDetail.pairings;
        vm.image = vm.recipeDetail.image;
        vm.servings = vm.recipeDetail.servings;
        vm.tags = vm.recipeDetail.tags;
        vm.featured = vm.recipeDetail.featured;

        // vm.categoryKey = vm.recipeDetail.category.replace(/\W+/g, '-').toLowerCase();
      }
    })
    .error(function(data, status) {
      alert("Error retreiving recipe");
    });

  function updateRecipe() {
    Recipe.update(vm.recipeDetail._id, {
      name: vm.name,
      key: vm.key,
      description: vm.description,
      category: vm.category,
      categoryKey: vm.categoryKey,
      date: vm.date,
      source: vm.source,
      addedBy: vm.addedBy,
      prepTime: vm.prepTime,
      cookTime: vm.cookTime,
      ingredients: vm.ingredients,
      directions: vm.directions,
      pairings: vm.pairings,
      image: vm.image,
      servings: vm.servings,
      tags: vm.tags,
      featured: vm.featured
    });
    $location.url('/recipes/view/' + categoryKey + '/' + recipeName);
  }

  function deleteRecipe() {
    Recipe.delete(vm.recipeDetail._id);
    $location.url('/recipes');
  }

  function addIngredient() {
    vm.ingredients.push(vm.newIngredient);
    vm.newIngredient = '';
  }

  function removeIngredient(item) {
    vm.ingredients.splice(item, 1);
  }

  function addTag() {
    if(vm.newTag) {
      vm.tags.push(vm.newTag);
      vm.newTag = '';
    }
  }

  function removeTag(item) {
    vm.tags.splice(item, 1);
  }


});