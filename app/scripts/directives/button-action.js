'use strict';

/**
 * Performs a special action for marked up buttons.
 * 
 * @ngdoc directive
 * @name websiteAppApp.directive:buttonAction
 * @description
 * # buttonAction
 */
angular.module('websiteApp')
  .directive('buttonAction', function ($window) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on('click', function() {
          if ( attrs.buttonAction === 'openChat' && $window.LC_API ) {
            $window.LC_API.open_chat_window();
          }
        });
      }
    };
  });
