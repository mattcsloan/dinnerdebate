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

    o.getToday = function() {
      return $http.get(uri + 'today');
    };

    return o;
  }
})();
