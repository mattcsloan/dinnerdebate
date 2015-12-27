angular.module('RecipesCreateCtrl', []).controller('RecipesCreateController', function(Page, Recipe, $location) {
  var vm = this;

  Page.setTitle('Create New Recipe');   
  vm.title = 'Create New Recipe';

  vm.addRecipe = addRecipe;
  vm.addIngredient = addIngredient;
  vm.removeIngredient = removeIngredient;
  vm.createKey = createKey;
  vm.categoryOptions = [
    "Appetizers",
    "Breads & Muffins",
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
    "Sauces & Marinades",
    "Sides",
    "Soups"
  ]

  if(!vm.recipeCategory) {
    vm.recipeCategory = 'uncategorized';
  }

  vm.urlBase = location.host;

  vm.ingredients = [];

  function addIngredient() {
    vm.ingredients.push(vm.newIngredient);
    vm.newIngredient = '';
  }

  function removeIngredient(item) {
    vm.ingredients.splice(item, 1);
  }

  function createKey() {
    var recipeTitle = vm.recipeTitle;
    recipeTitle = recipeTitle.replace(/\W+/g, '-').toLowerCase();
    vm.recipeKey = recipeTitle;
  }

  function addRecipe() {
    vm.recipeDate = Date.now();
    Recipe.createNew( 
    { 
      name: vm.recipeTitle,
      description: vm.recipeDescription,
      category: vm.recipeCategory,
      key: vm.recipeKey,
      date: vm.recipeDate,
      source: vm.recipeSource,
      prepTime: vm.recipePrepTime,
      cookTime: vm.recipeCookTime,
      ingredients: vm.ingredients,
      directions: vm.recipeDirections,
      pairings: vm.recipePairings,
      image: vm.recipeImage,
      servings: vm.recipeServings,
      tags: vm.recipeTags,
      featured: vm.recipeFeatured
    })
    .success(function (res) {
      $location.url('/recipes/view/' + res._id);
    });
  }

});