(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('Page', page)
  ;

  /* @ngInject */
  function page() {
    var title = '';
    return {
      title: function() { return title; },
      setTitle: function(newTitle) { title = newTitle + ' | Dinner Debate' }
    };
  }
})();