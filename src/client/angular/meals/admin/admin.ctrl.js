angular.module('MealsAdminCtrl', []).controller('MealsAdminController', function(Page, MealsResource, Recipe) {
  var vm = this;

  Page.setTitle('Admin');   
  vm.title = 'Admin';
  vm.mealDate = _removeTime(moment());
  vm.addMeal = addMeal;
  vm.getMealForm = getMealForm;
  vm.mealInfo;
  vm.newItemType;
  vm.loadRecipeList = loadRecipeList;
  vm.itemSelected = itemSelected;
  vm.addItem = addItem;
  vm.removeItem = removeItem;

  // vm.sections = [
  //   {
  //     name: 'Entree',
  //     items: [{
  //       name: 'Asian Chicken Lettuce Wraps'
  //     }]
  //   },
  //   {
  //     name: 'Appetizers',
  //     items: [{
  //       name: 'Side Salad'
  //     }, {
  //       name: 'Egg Rolls'
  //     }]
  //   },
  //   {
  //     name: 'Sides',
  //     items: [{
  //       name: 'Steamed Rice'
  //     }, {
  //       name: 'Edamame'
  //     }]
  //   },
  //   {
  //     name: 'Drinks',
  //     items: [{
  //       name: 'Iced Tea'
  //     }]
  //   },
  //   {
  //     name: 'Desserts',
  //     items: [{
  //       name: 'Molten Chocolate Cake'
  //     }]
  //   }
  // ];

  vm.sections = [];

  function addItem() {
    if(vm.newItemType && vm.newItem) {
      //check if vm.sections has an object with the same section already
      var section = _.findIndex(vm.sections, function(o) { return o.name == vm.newItemType; });

      if(section > -1) {
        vm.sections[section].items.push(vm.newItem);
      } else {
        var itemToAdd = {
          name: vm.newItemType,
          items: [vm.newItem]
        }
        vm.sections.push(itemToAdd);
      }
      console.log(vm.sections);
    }
  }

  function removeItem(item, section) {

    vm.sections[section].items.splice(item, 1);
    if(vm.sections[section].items.length == 0) {
      vm.sections.splice(section, 1);
    }
  }

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
    console.log('date ' + date);
    vm.mealDateSelected = moment(date).format('ddd MMMM DD, YYYY');
    MealsResource.getByDate(moment(date).format('MMDDYYYY'))
      .success(function(res) {
        vm.mealInfo = res;
      });
  }

  function _removeTime(date) {
    return date.hour(0).minute(0).second(0).millisecond(0);
  }

  function loadRecipeList() {
    console.log('vm.newItemType ' + vm.newItemType);

    Recipe.getAll()
      .success(function(data, status) {
        vm.recipeList = data;
      })
      .error(function(data, status) {
        console.log("Error retrieving recipes");
      });
  }

  function itemSelected() {
    console.log('vm.newItem ' + vm.newItem);
  }
});