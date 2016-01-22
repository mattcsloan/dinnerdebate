(function() {
  'use strict';

  angular
    .module('app.factories')
    .factory('CategoryResource', categoryResource)
  ;

  /* @ngInject */
  function categoryResource() {
    var categories = '/auth/user';

    var o = {
    };

    o.allCategories = function() {
      return [
        "Appetizers",
        "Breads and Muffins",
        "Breakfast",
        "Cakes",
        "Cookies",
        "Desserts",
        "Drinks",
        "Entrees",
        "Kids",
        "Pies",
        "Pets",
        "Salads",
        "Sauces and Marinades",
        "Sides",
        "Soups"
      ];
    }

    return o;

  }
})();
