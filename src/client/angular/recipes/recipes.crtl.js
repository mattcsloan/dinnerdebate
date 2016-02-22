angular.module('RecipesCtrl', []).controller('RecipesController', function (Page, Recipe, CategoryResource, categoryName, $location, $window) {
  var vm = this;

  Page.setTitle('Recipes');   
  vm.title = 'Recipes';
  vm.querystring = $location.search();
  vm.categoryOptions = CategoryResource.allCategories();
  vm.selectedCategory = selectedCategory;
  vm.changeCriteria = changeCriteria;
  vm.localStoredView = $window.localStorage.getItem('recipes-view');
  vm.localStoredCriteria = $window.localStorage.getItem('recipes-criteria');
  vm.localStoredNumItems = $window.localStorage.getItem('recipes-numItems');
  vm.changeView = changeView;
  vm.currentPage = 1;
  vm.numItems = 24;
  vm.numItemsOptions = [12,24,48,96];
  vm.changeNumItems = changeNumItems;
  vm.resetPaginationPage = resetPaginationPage;


  if(vm.localStoredView) {
    vm.view = vm.localStoredView;
  } else {
    vm.view = 'list';
  }

  if(vm.localStoredCriteria) {
    vm.orderCriteria = vm.localStoredCriteria;
  } else {
    vm.orderCriteria = 'name';
  }

  if(vm.localStoredNumItems) {
    vm.numItems = vm.localStoredNumItems;
  } else {
    vm.numItems = 24;
  }

  function resetPaginationPage() {
    vm.currentPage = 1;
  }

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
    $window.localStorage.setItem('recipes-criteria', criteria);
  }

  function changeNumItems(num) {
    vm.numItems = num;
    $window.localStorage.setItem('recipes-numItems', num);
  }

  function changeView(view) {
    vm.view = view;
    $window.localStorage.setItem('recipes-view', view);
    vm.showWithThumbsOnly = false;
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

  // Recipe.getFirst(vm.numItems, 'name')
  //   .success(function(data, status) {
  //     vm.recipes = data;

  //     for(i = 0; i < vm.recipes.length; i++) {
  //       if(vm.recipes[i].image == null) {
  //         vm.recipes[i].image = {
  //             url: null,
  //             width: null,
  //             height: null
  //         }
  //       }

  //       if(typeof vm.recipes[i].image == 'string') {
  //         vm.recipes[i].image = {
  //             url: vm.recipes[i].image,
  //             width: null,
  //             height: null
  //         }
  //       }

  //       if(vm.recipes[i].image.url) {
  //         var imageUrl = vm.recipes[i].image.url;
  //         if(imageUrl.indexOf('image/upload') > -1) {
  //           var thumbUrl = imageUrl.split('image/upload');
  //           thumbUrl = thumbUrl[0] + 'image/upload/a_exif,c_fill,h_200,w_300' + thumbUrl[1]
  //           vm.recipes[i].thumb = thumbUrl;
  //         }
  //       }
  //     }

  //     getAllRecipes();

  //   })
  //   .error(function(data, status) {
  //     console.log("Error retrieving recipes");
  //   });

  getAllRecipes();

  function getAllRecipes() {
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

          if(vm.recipes[i].image.url) {
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
  }

});