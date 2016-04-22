angular.module('MealsAdminCtrl', []).controller('MealsAdminController', function(Page, MealsResource, $scope) {
  var vm = this;

  Page.setTitle('Admin');   
  vm.title = 'Admin';
  vm.mealDate = _removeTime(moment());
  vm.addMeal = addMeal;
  vm.getMealForm = getMealForm;


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
});