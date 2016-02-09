angular.module('RecipesViewCtrl', []).controller('RecipesViewController', function(Page, Recipe, $http, $location, $rootScope, categoryKey, recipeName) {
  var vm = this;

  Page.setTitle('View Recipe');   
  vm.title = 'View Recipe';
  vm.categoryKey = categoryKey;
  vm.recipeName = recipeName;

  vm.user = $rootScope.user;
  vm.username = vm.user.username;
  // vm.userGroup = vm.user.groups.items[0].name;
  vm.layout = 'vertical';

  Recipe.getOne(categoryKey, recipeName)
    .success(function(data, status) {
      if(data == null) {
        console.log('Recipe does not exist');
        $location.url('/recipes?message=Recipe%20does%20not%20exist.');
      } else {
        vm.recipeDetail = data;
        Page.setTitle(vm.recipeDetail.name);  
        if(typeof vm.recipeDetail.image == 'string') {
          vm.recipeDetail.image = {
              url: vm.recipeDetail.image,
              width: null,
              height: null
          }
        }
        if(vm.recipeDetail.image.url && vm.recipeDetail.image.url.indexOf('image/upload') > -1) {
          var newImage = vm.recipeDetail.image.url.split('image/upload');
          vm.recipeDetail.image.url = newImage[0] + 'image/upload' + '/a_exif,w_1000' + newImage[1];
        }
        if(vm.recipeDetail.image.width && vm.recipeDetail.image.height) {
          if(vm.recipeDetail.image.width > vm.recipeDetail.image.height && vm.recipeDetail.image.width > 968) {
            vm.layout = 'horizontal';
          }
        }
      }
    })
    .error(function(data, status) {
      console.log(data);
      $location.url('/recipes?message=We%20could%20not%20load%20the%20recipe%20at%20this%20time.%20Please%20try%20again%20or%20view%20another%20recipe.');
    });
});