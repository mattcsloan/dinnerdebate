(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('MealsResource', mealsResource)
  ;

  /* @ngInject */
  function mealsResource($http) {
    var uri = '/api/meals/';

    var o = {
      meal: []
    };

    o.getAll = function() {
      return $http.get(uri);
    },

    o.getAllDev = function() {
      return $http.get(uri + 'dev');
    },

    o.getByDate = function(date) {
      return $http.get(uri + date);
    },

    o.getMonthlyMeals = function(start, end) {
      return $http.get(uri + 'from/' + start + '/to/' + end);
    },

    o.getToday = function() {
      return $http.get(uri + 'today');
    },

    o.addMeal = function(postData) {
      return $http.post(uri, postData);
    },

    o.updateMeal = function(date, postData) {
      return $http.put(uri + date, postData);
    };

    return o;
  }
})();
