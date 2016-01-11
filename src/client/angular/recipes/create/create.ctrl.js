angular.module('RecipesCreateCtrl', []).controller('RecipesCreateController', function(Page, Recipe, UserResource, $location, $http, Cloudinary) {
  var vm = this;

  Page.setTitle('Create New Recipe');   
  vm.title = 'Create New Recipe';

  UserResource.getUser()
    .success(function(data, status) {
      vm.user = data;
    })
    .error(function(data, status) {
      console.log("Error retreiving user");
    });

  vm.addRecipe = addRecipe;
  vm.addIngredient = addIngredient;
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

  vm.uploadImage = uploadImage;
  vm.photoUrl = Cloudinary.url('sample', { format: 'jpg', 'height': 30, 'width': 30 });

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
  ];

  if(!vm.categoryKey) {
    vm.categoryKey = 'uncategorized';
  }

  vm.urlBase = location.host;

  vm.ingredients = [];

  function addIngredient() {
    if(vm.newIngredient) {
      vm.ingredients.push(vm.newIngredient);
      vm.newIngredient = '';
    }
  }

  function removeIngredient(item) {
    vm.ingredients.splice(item, 1);
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
    console.log(vm.recipeAddedBy);
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
          ingredients: vm.ingredients,
          directions: vm.recipeDirections,
          pairings: vm.recipePairings,
          image: vm.recipeImage,
          servings: vm.recipeServings,
          tags: vm.tags,
          featured: vm.recipeFeatured
        })
        .success(function (res) {
          $location.url('/recipes/view/' + vm.categoryKey + '/' + vm.recipeKey);
        });
      } else {
        console.log('key is not available');
      }
    } else {
      console.log('required fields not met');
    }
  }

  function uploadImage() {
    console.log('beginning upload');
    // cloudinary.uploader.upload("http://www.cookingclassy.com/wp-content/uploads/2015/05/skinny-banana-bread6-srgb.1.jpg", function(result) { 
    //   console.log(result); 



    var file = vm.uploadedImage;
    var cloud_name = 'sloan';

    var fd = new FormData();

    fd.append('upload_preset', 'seller');
    fd.append('file', file);

    $http
      .post('https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload', fd)
      .success(function (cloudinaryResponse) {
          // do stuff with cloudinary response
          // cloudinaryResponse = { public_id: ..., etc. }
        console.log(cloudinaryResponse);
      })
      .error(function (reponse) {
        console.log('error uploading file');
      });
  }

});