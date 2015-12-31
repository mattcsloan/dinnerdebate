(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('SelectedCategories', selectedCategories)
  ;

  /* @ngInject */
  function selectedCategories() {
    console.log('run filter');

    return function(tasks, tags) {
      return tasks.filter(function(task) {
          for (var i in task.Tags) {
              if (tags.indexOf(task.Tags[i]) != -1) {
                  return true;
              }
          }
          return false;
      });
    };

  }
})();