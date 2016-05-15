angular.module('MealsAdminCtrl', []).controller('MealsAdminController', function(Page, MealsResource, Recipe) {
  var vm = this;

  Page.setTitle('Admin');   
  vm.title = 'Admin';
  vm.mealDate = _removeTime(moment());
  vm.addMeal = addMeal;
  vm.getMealForm = getMealForm;
  vm.newItemType;
  vm.loadRecipeList = loadRecipeList;
  vm.addNewItem = addNewItem;
  function addMeal() {
    MealsResource.addMeal( 
    { 
      date: vm.mealDate,
      image: {
        main: {
          src: vm.image.main.src
        }
      },
      entree: {
        title: vm.entree.title
      },
      published: vm.published
    })
    .success(function (res) {
      console.log("Meal Added!");
    });

  }

  function getMealForm(date) {
    vm.mealDateSelected = moment(date).format('ddd MMMM DD, YYYY');
  }

  function _removeTime(date) {
    return date.hour(0).minute(0).second(0).millisecond(0);
  }

  function loadRecipeList() {
    console.log(vm.newItemType);

    Recipe.getAll()
      .success(function(data, status) {
        vm.recipeList = data;
      })
      .error(function(data, status) {
        console.log("Error retrieving recipes");
      });
  }

  function addNewItem() {
    console.log(vm.newItem);
  }
});