(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('modal', modal)
  ;

  /* @ngInject */
  function modal() {
    return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      transclude: true, // we want to insert custom content inside the directive
      link: function(scope, element, attrs) {
        scope.dialogStyle = {};
        if (attrs.width)
          scope.dialogStyle.width = attrs.width;
        if (attrs.height)
          scope.dialogStyle.height = attrs.height;
        scope.hideModal = function() {
          scope.show = false;
        };
      },
      template: "<div class='modal' ng-show='show'><div class='modal-overlay' ng-click='hideModal()'></div><div class='modal-container' ng-style='dialogStyle'><a class='modal-close text-muted icon-wrapper' ng-click='hideModal()'><i class='icon icon-cross'></i></a><div class='modal-content' ng-transclude></div></div></div>"
    };

  }
})();
