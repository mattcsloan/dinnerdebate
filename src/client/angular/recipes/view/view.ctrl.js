angular.module('RecipesViewCtrl', []).controller('RecipesViewController', function(Page, Recipe, $http, $location, $rootScope, categoryKey, recipeName) {
  var vm = this;

  Page.setTitle('View Recipe');   
  vm.title = 'View Recipe';
  vm.categoryKey = categoryKey;
  vm.recipeName = recipeName;

  vm.user = $rootScope.user;
  vm.username = vm.user.username;
  // vm.userGroup = vm.user.groups.items[0].name;

  Recipe.getOne(categoryKey, recipeName)
    .success(function(data, status) {
      if(data == null) {
        console.log('Recipe does not exist');
        $location.url('/recipes?message=Recipe%20does%20not%20exist.');
      } else {
        vm.recipeDetail = data;
        Page.setTitle(vm.recipeDetail.name);  
        if(typeof vm.recipeDetail.image == 'string') {
          console.log(vm.recipeDetail.image);
          vm.recipeDetail.image = {
              url: vm.recipeDetail.image
          }
          console.log("string moved to url: " + vm.recipeDetail.image.url);
        }
        if(vm.recipeDetail.image.url && vm.recipeDetail.image.url.indexOf('image/upload') > -1) {
          var newImage = vm.recipeDetail.image.url.split('image/upload');
          vm.recipeDetail.image.url = newImage[0] + 'image/upload' + '/a_exif,w_1000' + newImage[1];
          console.log("transformations added: " + vm.recipeDetail.image.url);
        }
      }
    })
    .error(function(data, status) {
      alert("Error retrieving recipe");
    });
});