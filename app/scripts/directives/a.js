'use strict';

/**
 * @ngdoc directive
 * @name lifelettersWebsiteApp.directive:a
 * @description
 * # a
 */
angular.module('lifeWebsite')
  .directive('a', function () {
    return {
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	// element.text('> '+element.text());
      }
    };
  });