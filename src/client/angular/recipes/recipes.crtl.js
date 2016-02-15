angular.module('RecipesCtrl', []).controller('RecipesController', function (Page, Recipe, CategoryResource, categoryName, $location) {
  var vm = this;

  Page.setTitle('Recipes');   
  vm.title = 'Recipes';
  vm.querystring = $location.search();
  vm.categoryOptions = CategoryResource.allCategories();
  vm.selectedCategory = selectedCategory;
  vm.orderCriteria = 'name';
  vm.changeCriteria = changeCriteria;
  vm.view = 'list';
  vm.changeView = changeView;

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


  function changeCriteria(criteria) {
    vm.orderCriteria = criteria;
  }

  function changeView(view) {
    vm.view = view;
  }

  vm.dismiss = dismiss;

  function dismiss(item) {
    if(item == 0) {
      vm.noCategoryMessage = '';
    } else if(item == 1) {
      vm.querystring.message = '';
    }
    $location.search('message', null);
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

      for(i = 0; i < vm.recipes.length; i++) {
        if(vm.recipes[i].image == null) {
          vm.recipes[i].image = {
              url: null,
              width: null,
              height: null
          }
        }

        if(typeof vm.recipes[i].image == 'string') {
          vm.recipes[i].image = {
              url: vm.recipes[i].image,
              width: null,
              height: null
          }
        }

        console.log(vm.recipes[i].category + ': ' + vm.recipes[i].name + ': ' + vm.recipes[i].image);
        if(vm.recipes[i].image.url) {
          console.log('has image url');
          var imageUrl = vm.recipes[i].image.url;
          if(imageUrl.indexOf('image/upload') > -1) {
            var thumbUrl = imageUrl.split('image/upload');
            thumbUrl = thumbUrl[0] + 'image/upload/a_exif,c_fill,h_200,w_300' + thumbUrl[1]
            vm.recipes[i].thumb = thumbUrl;
          }
        }
      }
    })
    .error(function(data, status) {
      console.log("Error retrieving recipes");
    });

});