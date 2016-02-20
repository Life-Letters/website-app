'use strict';

/**
 * Fetches the price of a given product.
 */
angular.module('websiteApp')
  .directive('fetchProduct', function ($http, $q, $log) {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs) {
      	scope.product = null;
      	$http.get(window.urls.productService+'products/'+attrs.fetchProduct)
      		.then(function(response) {
      			scope.product = response.data;
      		}, function(err) {
      			$log.error(err);
      		});
      }
    };
  });