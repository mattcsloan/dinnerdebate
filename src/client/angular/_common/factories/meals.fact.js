(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('MealsResource', mealsResource)
  ;

  /* @ngInject */
  function mealsResource($resource) {
    var uri = '/api/meals/';
    var timeout = 1000;
  }
})();
