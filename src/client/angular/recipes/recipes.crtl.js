angular.module('RecipesCtrl', []).controller('RecipesController', function (Page, Recipe) {
  var vm = this;

  Page.setTitle('Recipes');   
  vm.title = 'Recipes';
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
  ];

  vm.selectedCategory = selectedCategory;
  vm.category = '';
  
  function selectedCategory(category) {
    if(category) {
      vm.category = category;
    } else {
      vm.category = '';
    }
  } 

  // vm.selectedCategories = [];
  // vm.toggleCategory = toggleCategory;
  // vm.toggleAll = toggleAll;

  // function toggleCategory(category) {
  //   var categoryIndex = vm.selectedCategories.indexOf(category);
  //   if (categoryIndex > -1) {
  //     vm.selectedCategories.splice(categoryIndex, 1);
  //   } else {
  //     vm.selectedCategories.push(category);
  //   }
  // }

  // function toggleAll() {
  //   var categoryNum = vm.categoryOptions.length;
  //   if(vm.selectedCategories.length) {
  //     //deselect all
  //     vm.selectedCategories.length = 0;
  //   } else {
  //     //select all
  //     for(i = 0; i < categoryNum; i++) {
  //       vm.selectedCategories.push(vm.categoryOptions[i]);
  //     }
  //   }
  // }

  Recipe.getAll()
    .success(function(data, status) {
      vm.recipes = data;
    })
    .error(function(data, status) {
      console.log("Error retreiving recipes");
    });

});