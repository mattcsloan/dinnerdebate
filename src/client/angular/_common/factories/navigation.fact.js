(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('NavigationResource', navigationResource)
  ;

  /* @ngInject */
  function navigationResource($resource) {
    var uri = '/api/navigation/';
    var timeout = 1000;
    console.log('return navigation api');
  }
})();
