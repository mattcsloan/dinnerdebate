(function() {
  'use strict';

  angular
    .module('app.filters')
    .filter('removeNonMatchedKeyValues', removeNonMatchedKeyValues)
  ;

  /* @ngInject */
  function removeNonMatchedKeyValues() {
    return function (input, filterKey, filterVal) {
      var filteredInput =[];
      angular.forEach(input, function(value, key){
        if(value[filterKey] && value[filterKey] !== filterVal){
          filteredInput[key]= value;
        }
      });
      return filteredInput;
    };
  }
})();