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

      	$(attrs.elementFilter+' .filtered').each(function() {
      		var words = $(this).text().replace(/^\s*|\s*$/g, '').split(/[^a-z0-9]+/ig),
      				unique = lodash.uniq(words).join(' ');
      		elements[unique] = $(this);
      	});

      	function filterElements() {
      		var val = element.val(),
      				pattern = new RegExp(val, 'i'),
      				visible = 0;

      		lodash.each(elements, function($el, lookup) {
      			$el.removeClass('filtered-hit filtered-miss filtered-default');
      			
      			if ( lookup.match(pattern) ) { 
      				if ( visible === 0 ) {
      					$el.siblings('.clearfix').remove();
      				}
      				if ( visible > 0 && visible % 3 == 0) {
      					$el.before( $('<div class="clearfix visible-md visible-lg"></div>') );
      				}
      				if ( visible > 0 && visible % 2 == 0) {
      					$el.before( $('<div class="clearfix visible-sm"></div>') );
      				}
      				if ( val.length === 0 ) {
      					$el.addClass('filtered-default');
      				} else {
      					$el.addClass('filtered-hit');
      				}
      				visible++;
      			} else {
      				$el.addClass('filtered-miss');
      			}
      		});
      	}
        element.on('keyup', lodash.debounce(filterElements, 500));
      }
    };
  });
