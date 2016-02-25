angular.module('MealsCtrl', []).controller('MealsController', function(Page, $scope) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.date = moment().format("MMMM Do, YYYY");

  $scope.day = moment();

});