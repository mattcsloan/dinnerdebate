angular.module('RecipesViewCtrl', []).controller('RecipesViewController', function(Page, Recipe, $http, $location, UserResource, categoryKey, recipeName) {
  var vm = this;

  Page.setTitle('View Recipe');   
  vm.title = 'View Recipe';
  vm.categoryKey = categoryKey;
  vm.recipeName = recipeName;

  UserResource.getUser()
    .success(function(data, status) {
      vm.user = data;
      vm.username = vm.user.username;
      vm.userGroup = vm.user.groups.items[0].name;
    })
    .error(function(data, status) {
      console.log("Error retreiving user");
    });

  Recipe.getOne(categoryKey, recipeName)
    .success(function(data, status) {
      if(data == null) {
        console.log('Recipe does not exist');
        $location.url('/recipes?message=Recipe%20does%20not%20exist.');
      } else {
        vm.recipeDetail = data;
        console.log(data.addedBy.username);
      }
    })
    .error(function(data, status) {
      alert("Error retreiving recipe");
    });
});