angular.module('MealsAdminCtrl', []).controller('MealsAdminController', function(Page, MealsResource) {
  var vm = this;

  Page.setTitle('Admin');   
  vm.title = 'Admin';
  vm.dayChanged = dayChanged;
  // vm.day = moment().format('dddd, MMMM Do YYYY');
  vm.mealDate = _removeTime(moment());
  vm.addMeal = addMeal;


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

  function dayChanged() {
    console.log(vm.mealDate);
  }

  function _removeTime(date) {
    return date.hour(0).minute(0).second(0).millisecond(0);
  }
});