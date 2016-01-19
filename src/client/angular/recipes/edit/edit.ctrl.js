angular.module('RecipesEditCtrl', []).controller('RecipesEditController', function(Page, Recipe, $rootScope, $location, categoryKey, recipeName, $timeout, Upload) {
  var vm = this;

  Page.setTitle('Edit Recipe');   
  vm.title = 'Edit Recipe';

  vm.updateRecipe = updateRecipe;
  vm.deleteRecipe = deleteRecipe;
  vm.addIngredient = addIngredient;
  vm.editIngredient = editIngredient;
  vm.removeIngredient = removeIngredient;
  vm.reorderIngredient = reorderIngredient;
  vm.addTag = addTag;
  vm.removeTag = removeTag;
  vm.uploadFile = uploadFile;
  vm.createKey = createKey;
  vm.createCategoryKey = createCategoryKey;
  vm.keyAvailability = keyAvailability;
  vm.requiredFields = [
    vm.name,
    vm.key,
    vm.category,
    vm.categoryKey
  ];

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

    if(vm.categoryKey != '' && vm.key != '') {
      if(vm.categoryKey == vm.recipeDetail.categoryKey && vm.key == vm.recipeDetail.key) {
        //the values are equal to the current URL
        vm.keyIsAvailable = true;
        vm.completedKeys = true;
        vm.showURLStatus = true;
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
      vm.keyIsAvailable = false;
      vm.completedKeys = false;
      vm.showURLStatus = false;
    }
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

        if(vm.recipeDetail.source || vm.recipeDetail.sourceURL) {
          vm.recipeOwnership = true;
        } else {
          vm.recipeOwnership = false;
        }
      }
    })
    .error(function(data, status) {
      console.log("Error retreiving recipe");
    });

  function updateRecipe() {
    if(vm.name && vm.key && vm.category && vm.categoryKey) {
      if(vm.keyIsAvailable || (vm.key == recipeName && vm.categoryKey == categoryKey)) {
        Recipe.update(vm.categoryKey, vm.key, vm.recipeDetail._id, {
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
        })
        .success(function (res) {
          if(res == 'Recipe already exists.') {
            vm.keyIsAvailable = false;
            vm.completedKeys = true;
            vm.showURLStatus = true;
          } else {
            $location.url('/recipes/view/' + vm.categoryKey + '/' + vm.key);
          }
        });
      } else {
        vm.keyIsAvailable = false;
        vm.completedKeys = true;
        vm.showURLStatus = true;
      }
    } else {
      console.log('required fields not met');
    }
  }

  function deleteRecipe() {
    Recipe.delete(vm.recipeDetail._id)
      .success(function () {
        $location.url('/recipes');
      });
  }

  function addIngredient() {
    vm.ingredients.push(vm.newIngredient);
    vm.newIngredient = '';
  }

  function editIngredient(item, value) {
    // check first to see if value already exists in array
    if(vm.ingredients.indexOf(value) == -1) {
      vm.ingredients.splice(item, 1, value);
    }
  }

  function removeIngredient(item) {
    vm.ingredients.splice(item, 1);
  }

  function reorderIngredient(direction, item) {
    var ingredient = vm.ingredients.splice(item, 1);
    if(direction == 'up') {
      if(item == 0) {
        var newIndex = item;
      } else {
        var newIndex = item - 1;
      }
    } else if(direction == 'down') {
      var newIndex = item + 1;
    } else {
      var newIndex = vm.ingredients.length + 1;
    }
    vm.ingredients.splice(newIndex, 0, ingredient[0]);
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

  function uploadFile(file, errFiles) {
    if(vm.recipeKey) {
      vm.newFileName = vm.recipeKey;
    } else {
      vm.newFileName = 'recipe-image';
    }
    vm.f = file;
    vm.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
          url: '/api/upload',
          data: {file: file, fileName: vm.newFileName},
      });
      // file.rename = Upload.rename(file, vm.newFileName + '.jpg');
      // file.rename();
      file.upload.then(function (response) {
          $timeout(function () {
              vm.image = response.data;
          });
      }, function (response) {
          if (response.status > 0)
              vm.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    } 
  };

});