'use strict';

/**
 * @ngdoc directive
 * @name websiteApp.directive:elementFilter
 * @description
 * # elementFilter
 */
angular.module('websiteApp')
  .directive('elementFilter', function (lodash) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	var elements = {};

      	$(attrs.elementFilter).each(function() {
      		var words = $(this).text().replace(/^\s*|\s*$/g, '').split(/[^a-z0-9]+/ig),
      				unique = lodash.uniq(words).join(' ');
      		elements[unique] = $(this);
      	});

      	function filterElements() {
      		var val = new RegExp(element.val(), 'i'),
      				visible = 0;

      		lodash.each(elements, function($el, lookup) {
      			$el.hide();
      			if ( lookup.match(val) ) { 
      				if ( visible === 0 ) {
      					$el.siblings('.clearfix').remove();
      				}
      				if ( visible > 0 && visible % 3 == 0) {
      					$el.before( $('<div class="clearfix visible-md visible-lg"></div>') );
      				}
      				if ( visible > 0 && visible % 2 == 0) {
      					$el.before( $('<div class="clearfix visible-sm"></div>') );
      				}
      				$el.show();
      				visible++;
      			}
      		});
      	}
        element.on('keyup', lodash.debounce(filterElements, 500));
      }
    };
  });
