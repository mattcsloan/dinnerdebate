angular.module('MealsCtrl', []).controller('MealsController', function(Page, $scope, $http) {
  var vm = this;

  Page.setTitle('Weekly Meals');   
  vm.title = 'Weekly Meal Suggestions';

  vm.day = moment();

  $http.get('/api/meals')
    .success(function (res) {
      vm.items = res;
    });


});