(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('Recipe', recipe)
  ;

  /* @ngInject */
  function recipe($http) {
    var uri = '/api/recipes';

    var o = {
      recipe: []
    };

    o.getAll = function() {
      return $http.get(uri);
    },
    o.getOne = function(id) {
      return $http.get(uri + '/' + id);
    },
    o.createNew = function(postData) {
      return $http.post(uri, postData);
    },
    o.update = function(id, postData) {
      return $http.put(uri + '/' + id, postData);
    },
    o.delete = function(id) {
      return $http.delete(uri + '/' + id);
    }

    return o;
  }
})();