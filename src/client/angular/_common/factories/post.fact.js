(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('Post', post)
  ;

  /* @ngInject */
  function post($http) {
    var uri = '/api/posts';

    var o = {
      post: []
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