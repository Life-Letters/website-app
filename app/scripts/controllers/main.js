'use strict';

/**
 * @ngdoc function
 * @name websiteAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the websiteAppApp
 */
angular.module('websiteAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
