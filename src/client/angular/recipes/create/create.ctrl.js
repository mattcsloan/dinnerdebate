angular.module('RecipesCreateCtrl', []).controller('RecipesCreateController', function(Page, Recipe, $rootScope, $location, $timeout, Upload, CategoryResource) {
  var vm = this;

  Page.setTitle('Create New Recipe');   
  vm.title = 'Create New Recipe';

  vm.user = $rootScope.user;

  vm.uploadFile = uploadFile;
  vm.removeImage = removeImage;
  vm.addRecipe = addRecipe;
  vm.addIngredient = addIngredient;
  vm.editIngredient = editIngredient;
  vm.reorderIngredient = reorderIngredient;
  vm.removeIngredient = removeIngredient;
  vm.addTag = addTag;
  vm.removeTag = removeTag;
  vm.addHint = addHint;
  vm.editHint = editHint;
  vm.removeHint = removeHint;
  vm.createKey = createKey;
  vm.createCategoryKey = createCategoryKey;
  vm.keyAvailability = keyAvailability;
  vm.getSimilarItems = getSimilarItems;
  vm.addSimilarItem = addSimilarItem;
  vm.removeSimilarItem = removeSimilarItem;
  vm.requiredFields = [
    vm.recipeTitle,
    vm.recipeKey,
    vm.recipeCategory,
    vm.categoryKey
  ];
  vm.recipeImage = {
    url: '',
    width: '',
    height: ''
  };

  vm.categoryOptions = CategoryResource.allCategories();

  if(!vm.categoryKey) {
    vm.categoryKey = 'uncategorized';
  }

  vm.urlBase = location.host;

  vm.addIngredientSet = addIngredientSet;
  vm.removeIngredientSet = removeIngredientSet;
  vm.multipleLists = false;

  vm.ingredientSets = [{
    title: '',
    list: []
  }];

  vm.newIngredient = [];

  function addIngredientSet() {
    vm.multipleLists = true;
    vm.ingredientSets.push({
      title: '',
      list: []
    });
  }

  function removeIngredientSet(setNum) {
    vm.ingredientSets.splice(setNum, 1);
  }

  function addIngredient(setNum) {
    if(vm.newIngredient[setNum]) {
      for(i = 0; i < vm.newIngredient[setNum].length; i++) {
        // check first to see if value already exists in array
        if(vm.ingredientSets[setNum].list.indexOf(vm.newIngredient[setNum][i]) == -1) {
          vm.ingredientSets[setNum].list.push(vm.newIngredient[setNum][i]);
        }
      }
      vm.newIngredient[setNum] = '';
    }
  }

  function editIngredient(item, value, setNum) {
    // check first to see if value already exists in array
    if(vm.ingredientSets[setNum].list.indexOf(value) == -1) {
      vm.ingredientSets[setNum].list.splice(item, 1, value);
    }
  }

  function reorderIngredient(direction, item, setNum) {
    var ingredient = vm.ingredientSets[setNum].list.splice(item, 1);
    if(direction == 'up') {
      if(item == 0) {
        var newIndex = item;
      } else {
        var newIndex = item - 1;
      }
    } else if(direction == 'down') {
      var newIndex = item + 1;
    } else {
      var newIndex = vm.ingredientSets[setNum].list.length + 1;
    }
    vm.ingredientSets[setNum].list.splice(newIndex, 0, ingredient[0]);
  }

  function removeIngredient(item, setNum) {
    vm.ingredientSets[setNum].list.splice(item, 1);
  }

  vm.tags = [];

  function addTag() {
    if(vm.newTag && vm.tags.indexOf(vm.newTag) == -1) {
      vm.tags.push(vm.newTag);
      vm.newTag = '';
    }
  }

  function removeTag(item) {
    vm.tags.splice(item, 1);
  }

  vm.hints = [];

  function addHint() {
    if(vm.newHint && vm.hints.indexOf(vm.newHint) == -1) {
      vm.hints.push(vm.newHint);
      vm.newHint = '';
    }
  }

  function editHint(item, value) {
    // check first to see if value already exists in array
    if(vm.hints.indexOf(value) == -1) {
      vm.hints.splice(item, 1, value);
    }
  }

  function removeHint(item) {
    vm.hints.splice(item, 1);
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
    vm.submittingForm = true;
    if(!vm.recipeImage.url) {
      vm.recipeImage.url = null;
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
          hints: vm.hints,
          pairings: vm.recipePairings,
          image: {
            url: vm.recipeImage.url,
            width: vm.recipeImage.width,
            height: vm.recipeImage.height
          },
          servings: vm.recipeServings,
          tags: vm.tags,
          featured: vm.recipeFeatured,
          relatedItems: vm.similarItems
        })
        .success(function (res) {
          if(res == 'Recipe already exists.') {
            vm.keyIsAvailable = false;
            vm.completedKeys = true;
            vm.showURLStatus = true;
            vm.submittingForm = false;
          } else {
            $location.url('/recipes/view/' + vm.categoryKey + '/' + vm.recipeKey);
          }
        });
      } else {
        console.log('key is not available');
        vm.submittingForm = false;
      }
    } else {
      console.log('required fields not met');
      vm.submittingForm = false;
    }
    vm.submittingForm = false;
  }

  function removeImage() {
    vm.recipeImage = {
      url: '',
      width: '',
      height: ''
    };
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
              vm.recipeImage.url = response.data.fileUrl;
              vm.recipeImage.width = response.data.fileWidth;
              vm.recipeImage.height = response.data.fileHeight;
          });
      }, function (response) {
          if (response.status > 0)
              vm.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    } 
  }

  vm.showSimilarBtn = true;
  vm.similarItems = [];

  function getSimilarItems() {
    Recipe.getAll()
      .success(function(data, status) {
        vm.recipeList = data;
        for(i = 0; i < vm.recipeList.length; i++) {
          if(vm.recipeList[i].image.url) {
            var imageUrl = vm.recipeList[i].image.url;
            if(imageUrl.indexOf('image/upload') > -1) {
              var thumbUrl = imageUrl.split('image/upload');
              thumbUrl = thumbUrl[0] + 'image/upload/a_exif,c_fill,h_200,w_300' + thumbUrl[1]
              vm.recipeList[i].thumb = thumbUrl;
            }
          }
        }
      })
      .error(function(data, status) {
        console.log("Error retrieving recipes");
      });

    vm.showSimilarItems = true;
    vm.showSimilarBtn = false;
  }

  function addSimilarItem() {
    vm.similarItem.url = vm.similarItem.categoryKey + '/' + vm.similarItem.key;
    vm.similarItem = {
      name: vm.similarItem.name,
      url: vm.similarItem.url,
      thumb: vm.similarItem.thumb,        
    };

    //check to see if url value already exists anywhere in vm.similarItems array
    var found = vm.similarItems.some(function(arrVal) {
      return vm.similarItem.url === arrVal.url;
    });

    if(!found && vm.similarItems.length < 3) {
      vm.similarItems.push(vm.similarItem);
    }

    if(vm.similarItems.length >= 3) {
      vm.showSimilarItems = false;
    } else {
      vm.showSimilarItems = true;
    }
  }

  function removeSimilarItem(item) {
    vm.similarItems.splice(item, 1);
    
    if(vm.similarItems.length >= 3) {
      vm.showSimilarItems = false;
    } else {
      vm.showSimilarItems = true;
    }
  }

});