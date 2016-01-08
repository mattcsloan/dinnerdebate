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


  vm.createKey = createKey;
  vm.createCategoryKey = createCategoryKey;
  vm.keyAvailability = keyAvailability;
  vm.urlBase = location.host;
  vm.showURLStatus = true;
  vm.keyIsAvailable = true;
  vm.initialKeyStatus = true;

  function createKey() {
    if(vm.name) {
      var recipeTitle = vm.name;
      recipeTitle = recipeTitle.replace(/\W+/g, '-').toLowerCase();
      vm.key = recipeTitle;
      keyAvailability();
    } else {
      vm.key = '';
      vm.keyIsAvailable = true;
    }
  }

  function createCategoryKey() {
    var categoryKey = vm.category;
    categoryKey = categoryKey.replace(/\W+/g, '-').toLowerCase();
    vm.categoryKey = categoryKey;
    keyAvailability();
  }

  function keyAvailability() {
    vm.initialKeyStatus = false;
    //if key values aren't empty and they're not equal to the existing url

    console.log('vm.categoryKey: ' + vm.categoryKey + '; vm.key:' + vm.key);
    console.log('vm.recipeDetail.categoryKey: ' + vm.recipeDetail.categoryKey + '; vm.recipeDetail.key:' + vm.recipeDetail.key);
    if(vm.categoryKey != '' && vm.key != '') {
      if(vm.categoryKey == vm.recipeDetail.categoryKey && vm.key == vm.recipeDetail.key) {
        //the values are equal to the current URL
        vm.keyIsAvailable = true;
        vm.completedKeys = true;
        vm.showURLStatus = true;
        console.log('same as url');
      } else {
        Recipe.getOne(vm.categoryKey, vm.key)
          .success(function(data, status) {
            if(data) {
              vm.keyIsAvailable = false;
            } else {
              vm.keyIsAvailable = true;
            }
            vm.showURLStatus = true;
          })
          .error(function(data, status) {
            console.log(status = ': ' + data);
          });
      }
      vm.completedKeys = true;
    } else {
      console.log('else statement');
      vm.keyIsAvailable = false;
      vm.completedKeys = false;
      vm.showURLStatus = false;
    }
    console.log('keyIsAvailable:' + vm.keyIsAvailable + '; ' + 'completedKeys:' + vm.completedKeys + '; ' + 'showURLStatus:' + vm.showURLStatus);
  }




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
      if(data == null) {
        console.log('Recipe does not exist');
        $location.url('/recipes?message=Recipe%20does%20not%20exist.');
      } else {
        vm.recipeDetail = data;

        vm.name = vm.recipeDetail.name;
        vm.key = vm.recipeDetail.key;
        vm.description = vm.recipeDetail.description;
        vm.category = vm.recipeDetail.category;
        vm.categoryKey = vm.recipeDetail.categoryKey;
        vm.date = vm.recipeDetail.date;
        vm.source = vm.recipeDetail.source;
        vm.sourceURL = vm.recipeDetail.sourceURL;
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
      }
    })
    .error(function(data, status) {
      console.log("Error retreiving recipe");
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
      sourceURL: vm.sourceURL,
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