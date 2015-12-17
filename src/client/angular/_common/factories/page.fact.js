(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('Page', page)
  ;

  /* @ngInject */
  function page() {
    var title = 'Boilerplate';
    return {
      title: function() { return title + ' | Boilerplate'; },
      setTitle: function(newTitle) { title = newTitle + ' | Boilerplate' }
    };
  }
})();