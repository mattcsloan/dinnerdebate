angular.module('MealsAdminCtrl', []).controller('MealsAdminController', function(Page, MealsResource, Recipe) {
  var vm = this;

  Page.setTitle('Admin');   
  vm.title = 'Admin';
  vm.mealUrl;
  vm.mealDate = _removeTime(moment());
  vm.addMeal = addMeal;
  vm.getMealForm = getMealForm;
  vm.mealInfo;
  vm.newItemType;
  vm.loadRecipeList = loadRecipeList;
  vm.addItem = addItem;
  vm.removeItem = removeItem;
  vm.reorderItem = reorderItem;
  vm.updatePreview = updatePreview;
  vm.sections = [];
  vm.deleteMeal = deleteMeal;
  vm.modalShown = false;
  vm.toggleModal = function() {
    vm.modalShown = !vm.modalShown;
  };

  function addItem() {
    if(vm.newItemType && vm.newItem) {
      //check if vm.sections has an object with the same section already
      var section = _.findIndex(vm.sections, function(o) { return o.name == vm.newItemType; });

      //if section already exists
      if(section > -1) {
        //only add item if section does not already have item
        var checkForItem = _.findIndex(vm.sections[section].items, function(o) { return o.key == vm.newItem.key; });
        if(checkForItem === -1) {
          // only one entree allowed, clear existing entree
          if(vm.sections[section].name === "Entree") {
            vm.sections[section].items.splice(0);
          }
          vm.sections[section].items.push(vm.newItem);
        }
      } else {
        //add item to existing section
        var itemToAdd = {
          name: vm.newItemType,
          items: [vm.newItem]
        }
        vm.sections.push(itemToAdd);
      }

      updatePreview();
    }
  }

  function removeItem(item, section) {
    vm.sections[section].items.splice(item, 1);
    if(vm.sections[section].items.length == 0) {
      vm.sections.splice(section, 1);
    }
    updatePreview();
  }

  function reorderItem(direction, item, section) {
    var itemToMove = vm.sections[section].items.splice(item, 1);
    if(direction == 'up') {
      if(item == 0) {
        var newIndex = item;
      } else {
        var newIndex = item - 1;
      }
    } else if(direction == 'down') {
      var newIndex = item + 1;
    } else {
      var newIndex = vm.sections[section].items.length + 1;
    }
    vm.sections[section].items.splice(newIndex, 0, itemToMove[0]);
    updatePreview();
  }

  function updatePreview() {
    if(vm.sections) {
      var section = _.findIndex(vm.sections, function(o) { return o.name == "Entree"; });
      if(section > -1) {
        vm.mainItem = vm.sections[section];
      } else {
        vm.mainItem = vm.sections[0];
      }

      vm.mainItem = vm.mainItem.items[0];
    }

    // take main image and make sure it displays thumbnail size
    if(vm.mainItem.image.url) {
      vm.mainImage = vm.mainItem.image.url;
      if(vm.mainImage.indexOf('image/upload') > -1) {
        var thumbUrl = vm.mainImage.split('image/upload');
        thumbUrl = thumbUrl[0] + 'image/upload/a_exif,c_fill,h_200,w_300' + thumbUrl[1]
        vm.mainImage = thumbUrl;
      }
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
    vm.mealDateSelected = moment(date).format('ddd MMMM DD, YYYY');
    vm.calendarPreviewDate = moment(date).format('D');
    MealsResource.getByDate(moment(date).format('MMDDYYYY'))
      .success(function(res) {
        vm.mealInfo = res;
      });
  }

  function _removeTime(date) {
    return date.hour(0).minute(0).second(0).millisecond(0);
  }

  function loadRecipeList() {
    Recipe.getAll()
      .success(function(data, status) {
        vm.recipeList = data;
      })
      .error(function(data, status) {
        console.log("Error retrieving recipes");
      });
  }

  function deleteMeal(date) {
    MealsResource.delete(moment(date).format('MMDDYYYY'))
      .success(function () {
        console.log('deleted');
      });
  }

});