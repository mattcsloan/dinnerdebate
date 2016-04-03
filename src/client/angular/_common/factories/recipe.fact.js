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
    o.getFirst = function(numItems, sort) {
      return $http.get(uri + '/first/' + numItems + '/' + sort);
    },
    o.getRandom = function() {
      return $http.get(uri + '/random');
    },
    o.getRandomWithImage = function() {
      return $http.get(uri + '/random/image');
    },
    o.getOne = function(category, name) {
      return $http.get(uri + '/' + category + '/' + name);
    },
    o.createNew = function(postData) {
      return $http.post(uri, postData);
    },
    o.update = function(categoryKey, key, id, postData) {
      return $http.put(uri + '/' + categoryKey + '/' + key + '/' + id, postData);
    },
    o.delete = function(id) {
      return $http.delete(uri + '/' + id);
    }

    return o;
  }
})();