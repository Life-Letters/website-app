'use strict';

/**
 * @ngdoc directive
 * @name lifelettersApp.directive:helpItems
 * @description
 * # helpItems
 */
angular.module('websiteApp')
  .directive('filteredList', function () {

    return {
      restrict: 'A',
      // link: function postLink(scope, element, attrs) {},
      controller: function(
		  		$scope,
		      $log,
		      $http,
		      $location,
		      $compile) {

      	var first = true;

		    $scope.filter = '';
		    $scope.loading = false;
		    
		    $scope.$watch('filter', function() {
		    	// Assume the content is already loaded into the page
		    	if (first) {
		    		first = false;
		    		return;
		    	}
		      $scope.loading = true;

		      // Update the URL to ensure a refresh shows the same results
		      $location.search('q', $scope.filter.length ? $scope.filter : null);

		      $http.get($location.path()+'?mode=body&q='+$scope.filter)
			      .then(function(response) {
			      	// Compile to ensure any included angular code is initialised
			      	var $list = $('[fl-content]', response.data),
			      			compiledList = $compile($list)($scope);
			      	// Replace existing list
			      	$('[fl-content]').replaceWith( compiledList );
			      });
		    });
      }
    };
  });
