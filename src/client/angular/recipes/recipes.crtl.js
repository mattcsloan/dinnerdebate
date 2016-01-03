angular.module('RecipesCtrl', []).controller('RecipesController', function (Page, Recipe, categoryName, $location) {
  var vm = this;

  Page.setTitle('Recipes');   
  vm.title = 'Recipes';
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

  vm.selectedCategory = selectedCategory;

  //translate url (categoryName) to title case
  if(categoryName) {
    vm.categoryKeyTranslation = categoryName.replace(/-/g, ' ');
    vm.categoryKeyTranslation = vm.categoryKeyTranslation.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    vm.categoryKeyTranslation = vm.categoryKeyTranslation.replace(' And ', ' and ');
  }

  if(categoryName && vm.categoryOptions.indexOf(vm.categoryKeyTranslation) > -1) {
    vm.category = vm.categoryKeyTranslation;
  } else {
    vm.category = '';
    if(categoryName) {
      vm.noCategoryMessage = 'There are no matching categories. Please choose one from the list.'
    }
  }

  function selectedCategory(category) {
    if(category) {
      vm.category = category;
    } else {
      vm.category = '';
    }
  }

  vm.orderCriteria = 'name';

  vm.changeCriteria = changeCriteria;

  function changeCriteria(criteria) {
    vm.orderCriteria = criteria;
  }

  vm.dismiss = dismiss;

  function dismiss() {
    vm.noCategoryMessage = '';
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