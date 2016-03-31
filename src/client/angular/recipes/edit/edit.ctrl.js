angular.module('RecipesEditCtrl', []).controller('RecipesEditController', function(Page, Recipe, CategoryResource, $rootScope, $location, $http, categoryKey, recipeName, $timeout, Upload) {
  var vm = this;

  vm.modalShown = false;
  vm.toggleModal = function() {
    vm.modalShown = !vm.modalShown;
  };


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
  vm.addHint = addHint;
  vm.editHint = editHint;
  vm.removeHint = removeHint;
  vm.uploadFile = uploadFile;
  vm.removeImage = removeImage;
  vm.createKey = createKey;
  vm.createCategoryKey = createCategoryKey;
  vm.keyAvailability = keyAvailability;
  vm.getSimilarItems = getSimilarItems;
  vm.addSimilarItem = addSimilarItem;
  vm.removeSimilarItem = removeSimilarItem;
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

  vm.categoryOptions = CategoryResource.allCategories();

  vm.addIngredientSet = addIngredientSet;
  vm.removeIngredientSet = removeIngredientSet;
  vm.multipleLists = false;

  vm.ingredientSets = [{
    title: '',
    list: []
  }];

  vm.newIngredient = [];

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
            console.log(status + ': ' + data);
          });
      }
      vm.completedKeys = true;
    } else {
      vm.keyIsAvailable = false;
      vm.completedKeys = false;
      vm.showURLStatus = false;
    }
  }

  Recipe.getOne(categoryKey, recipeName)
    .success(function(data, status) {
      if(data == null) {
        console.log('Recipe does not exist');
        $location.url('/recipes?message=Recipe%20does%20not%20exist.');
      } else {
        vm.recipeDetail = data;

        if(vm.recipeDetail.image == null) {
          vm.recipeDetail.image = {
              url: null,
              width: null,
              height: null
          }
        }

        if(typeof vm.recipeDetail.image == 'string') {
          vm.recipeDetail.image = {
              url: vm.recipeDetail.image,
              width: null,
              height: null
          }
        }

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
        vm.ingredientSets = vm.recipeDetail.ingredients;
        vm.directions = vm.recipeDetail.directions;
        vm.hints = vm.recipeDetail.hints;
        vm.pairings = vm.recipeDetail.pairings;
        vm.image = {
          url: vm.recipeDetail.image.url,
          width: vm.recipeDetail.image.width,
          height: vm.recipeDetail.image.height
        };
        vm.servings = vm.recipeDetail.servings;
        vm.tags = vm.recipeDetail.tags;
        vm.featured = vm.recipeDetail.featured;
        vm.similarItems = vm.recipeDetail.relatedItems;

        if(vm.recipeDetail.source || vm.recipeDetail.sourceURL) {
          vm.recipeOwnership = true;
        } else {
          vm.recipeOwnership = false;
        }

        if(vm.recipeDetail.ingredients.length > 1) {
          vm.multipleLists = true;
        }

        if(vm.similarItems.length < 3) {
          vm.showSimilarBtn = true;
        } else {
          vm.showSimilarBtn = false;
        }

        Page.setTitle('Edit | ' + vm.recipeDetail.name);   
      }
    })
    .error(function(data, status) {
      console.log("Error retrieving recipe");
    });

  function updateRecipe() {
    vm.submittingForm = true;
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
          ingredients: vm.ingredientSets,
          directions: vm.directions,
          hints: vm.hints,
          pairings: vm.pairings,
          image: vm.image,
          servings: vm.servings,
          tags: vm.tags,
          featured: vm.featured,
          relatedItems: vm.similarItems
        })
        .success(function (res) {
          if(res == 'Recipe already exists.') {
            vm.keyIsAvailable = false;
            vm.completedKeys = true;
            vm.showURLStatus = true;
            vm.submittingForm = false;
          } else {
            $location.url('/recipes/view/' + vm.categoryKey + '/' + vm.key);
          }
        });
      } else {
        vm.keyIsAvailable = false;
        vm.completedKeys = true;
        vm.showURLStatus = true;
        vm.submittingForm = false;
      }
    } else {
      console.log('required fields not met');
      vm.submittingForm = false;
    }
  }

  function deleteRecipe() {
    vm.submittingForm = true;
    Recipe.delete(vm.recipeDetail._id)
      .success(function () {
        $location.url('/recipes');
        vm.submittingForm = false;
      });
  }

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

  function addTag() {
    if(vm.newTag && vm.tags.indexOf(vm.newTag) == -1) {
      vm.tags.push(vm.newTag);
      vm.newTag = '';
    }
  }

  function removeTag(item) {
    vm.tags.splice(item, 1);
  }

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

  function removeImage() {
    var publicId = vm.image.url.split('image/upload/')[1];
    publicId = publicId.split('/');
    publicId = publicId[1] + '/' + publicId[2];
    publicId = publicId.replace(/\//g, "%2F");
    $http.delete('/api/upload?id=' + publicId);
    vm.image = {
      url: '',
      width: '',
      height: ''
    };
  }

  function uploadFile(file, errFiles) {
    if(vm.image.url) {
      removeImage();
    }
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
              vm.image = {
                url: response.data.fileUrl,
                width: response.data.fileWidth,
                height: response.data.fileHeight,
              };
          });
      }, function (response) {
          if (response.status > 0)
              vm.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    } 
  };

  function getSimilarItems() {
    Recipe.getAll()
      .success(function(data, status) {
        vm.recipeList = data;
        for(i = 0; i < vm.recipeList.length; i++) {
          if(vm.recipeList[i].image == null) {
            vm.recipeList[i].image = {
                url: null,
                width: null,
                height: null
            }
          }
          if(typeof vm.recipeList[i].image == 'string') {
            vm.recipeList[i].image = {
                url: vm.recipeList[i].image,
                width: null,
                height: null
            }
          }
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
    vm.pageUrl = vm.categoryKey + '/' + vm.key;


    //check to see if url value already exists anywhere in vm.similarItems array
    var found = vm.similarItems.some(function(arrVal) {
      return vm.similarItem.url === arrVal.url;
    });

    if(!found && vm.similarItems.length < 3 && vm.similarItem.url !== vm.pageUrl) {
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
      if(!vm.recipeList) {
        getSimilarItems();
      }
      vm.showSimilarItems = true;
    }
  }

});