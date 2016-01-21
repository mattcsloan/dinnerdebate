angular.module('RecipesCreateCtrl', []).controller('RecipesCreateController', function(Page, Recipe, $rootScope, $location, $timeout, Upload, CategoryResource) {
  var vm = this;

  Page.setTitle('Create New Recipe');   
  vm.title = 'Create New Recipe';

  vm.user = $rootScope.user;

  vm.uploadFile = uploadFile;
  vm.addRecipe = addRecipe;
  vm.addIngredient = addIngredient;
  vm.editIngredient = editIngredient;
  vm.reorderIngredient = reorderIngredient;
  vm.removeIngredient = removeIngredient;
  vm.addTag = addTag;
  vm.removeTag = removeTag;
  vm.createKey = createKey;
  vm.createCategoryKey = createCategoryKey;
  vm.keyAvailability = keyAvailability;
  vm.requiredFields = [
    vm.recipeTitle,
    vm.recipeKey,
    vm.recipeCategory,
    vm.categoryKey
  ];

  vm.categoryOptions = CategoryResource.allCategories();

  if(!vm.categoryKey) {
    vm.categoryKey = 'uncategorized';
  }

  vm.urlBase = location.host;

  vm.addIngredientSet = addIngredientSet;
  vm.multipleLists = false;

  vm.ingredientSets = [{
    title: '',
    list: []
  }];
  // vm.ingredients.title = '';
  // vm.ingredients.list = [];

  function addIngredientSet() {
    vm.ingredientSets.push({
      title: '',
      list: []
    });
    console.log(vm.ingredientSets);
  }

  function addIngredient(setNum) {
    if(vm.newIngredient) {
      // check first to see if value already exists in array
      if(vm.ingredientSets[setNum].list.indexOf(vm.newIngredient) == -1) {
        vm.ingredientSets[setNum].list.push(vm.newIngredient);
        vm.newIngredient = '';
      }
    }
  }

  function editIngredient(item, value) {
    // check first to see if value already exists in array
    if(vm.ingredients.list.indexOf(value) == -1) {
      vm.ingredients.list.splice(item, 1, value);
    }
  }

  function reorderIngredient(direction, item) {
    var ingredient = vm.ingredients.list.splice(item, 1);
    if(direction == 'up') {
      if(item == 0) {
        var newIndex = item;
      } else {
        var newIndex = item - 1;
      }
    } else if(direction == 'down') {
      var newIndex = item + 1;
    } else {
      var newIndex = vm.ingredients.list.length + 1;
    }
    vm.ingredients.list.splice(newIndex, 0, ingredient[0]);
  }

  function removeIngredient(item) {
    vm.ingredients.list.splice(item, 1);
  }

  vm.tags = [];

  function addTag() {
    if(vm.newTag) {
      vm.tags.push(vm.newTag);
      vm.newTag = '';
    }
  }

  function removeTag(item) {
    vm.tags.splice(item, 1);
  }

  function createKey() {
    if(vm.recipeTitle) {
      var recipeTitle = vm.recipeTitle;
      recipeTitle = recipeTitle.replace(/\W+/g, '-').toLowerCase();
      vm.recipeKey = recipeTitle;
      keyAvailability();
    } else {
      vm.recipeKey = '';
      vm.keyIsAvailable = true;
    }
  }

  function createCategoryKey() {
    var categoryKey = vm.recipeCategory;
    categoryKey = categoryKey.replace(/\W+/g, '-').toLowerCase();
    vm.categoryKey = categoryKey;
    keyAvailability();
  }

  function keyAvailability() {
    if(vm.categoryKey != '' && vm.categoryKey != 'uncategorized' && vm.recipeKey != '') {
      Recipe.getOne(vm.categoryKey, vm.recipeKey)
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
      vm.completedKeys = true;
    } else {
      vm.keyIsAvailable = false;
      vm.completedKeys = false;
      vm.showURLStatus = false;
    }
  }

  function addRecipe() {
    if(!vm.recipeImage) {
      vm.recipeImage = null;
    }
    if(vm.recipeTitle && vm.recipeKey && vm.recipeCategory && vm.categoryKey) {
      if(vm.keyIsAvailable) {
        vm.recipeDate = Date.now();
        Recipe.createNew( 
        { 
          name: vm.recipeTitle,
          key: vm.recipeKey, // auto generated
          description: vm.recipeDescription,
          category: vm.recipeCategory,
          categoryKey: vm.categoryKey, // auto generated
          date: vm.recipeDate,
          source: vm.recipeSource,
          sourceURL: vm.recipeSourceURL,
          addedBy: {
            username: vm.user.username,
            fullName: vm.user.fullName
          },
          prepTime: vm.recipePrepTime,
          cookTime: vm.recipeCookTime,
          ingredients: vm.ingredientSets,
          directions: vm.recipeDirections,
          pairings: vm.recipePairings,
          image: vm.recipeImage,
          servings: vm.recipeServings,
          tags: vm.tags,
          featured: vm.recipeFeatured
        })
        .success(function (res) {
          if(res == 'Recipe already exists.') {
            vm.keyIsAvailable = false;
            vm.completedKeys = true;
            vm.showURLStatus = true;
          } else {
            $location.url('/recipes/view/' + vm.categoryKey + '/' + vm.recipeKey);
          }
        });
      } else {
        console.log('key is not available');
      }
    } else {
      console.log('required fields not met');
    }
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
              vm.recipeImage = response.data;
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