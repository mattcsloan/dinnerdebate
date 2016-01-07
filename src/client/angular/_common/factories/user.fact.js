(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('UserResource', userResource)
  ;

  /* @ngInject */
  function userResource($http) {
    var uri = '/auth/user';

    var o = {
      user: []
    };

    o.getUser = function() {
      return $http.get(uri);
    }

    return o;

  }
})();
