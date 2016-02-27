'use strict';

angular
  .module('websiteApp', [
    'ngLodash',
    'ui.bootstrap',
    'angular-ladda',
    'duScroll',
    'sticky',
    'angularLazyImg',
    'sko.addThis',
    'sko.jquery',
    'life.common',
  ])
  .config(function ($locationProvider, $cookiesProvider, usersProvider, addThisProvider, lazyImgConfigProvider) {
    
    if ( window.urls.cookies ) {
      // Allow for cross-subdomain cookie sharing
      $cookiesProvider.defaults.domain = window.urls.cookies;
    }

  	$locationProvider.html5Mode(true);
    usersProvider.setUrl( window.urls.userService );
    addThisProvider.setId('ra-5406ccc677c1f23f');

    lazyImgConfigProvider.setOptions({
      offset: 100, // how early you want to load image (default = 100)
      errorClass: 'error', // in case of loading image failure what class should be added (default = null)
      successClass: 'lazy_loaded', // in case of loading image success what class should be added (default = null)
      // onError: function(image){}, // function fired on loading error
      // onSuccess: function(image){}, // function fired on loading success
      // container: angular.element(scrollable) // if scrollable container is not $window then provide it here
    });
  })
  .run(function ($rootScope, $http, $location, $compile, $window, $) {
    // Make some things available to the whole system
    // $rootScope.globals = globals;

    var initPageLoad = true;
    var locationWatcher = $rootScope.$on('$locationChangeStart', function(evt, newUrl, oldUrl) {
      if (initPageLoad) { initPageLoad = false; return; }

      // Ignore param changes
      if ( newUrl.replace(/\?.*/, '') === oldUrl.replace(/\?.*/, '')) { return; }

      // Jump the user over to the EHR for known URL patterns:
      if ( newUrl.match('add-to-cart') ) {
        // Stop watching to avoid loops
        locationWatcher();
        // Switch to the EHR
        $window.location.href = window.urls.ehr+$location.path().replace(/^\//, '');
        return;
      }

      // Asyncronously fetch the content
      $('[async-body]').addClass('async_hide');
      $http.get( newUrl+(newUrl.match(/\?/)?'&':'?')+'mode=body' )
        .then(function(response) {
          // Compile to ensure any included angular code is initialised
          var $body = $('[async-body]', $('<span>'+response.data+'</span>'));
          // Insert before linking to ensure the DOM is available to directives/controllers
          $('[async-body]').replaceWith($body);
          $compile($body)($rootScope);

          $rootScope.$emit('nav:highlight', $body.attr('nav-highlight'));

          // Replace the current theme tag
          $('body').attr('class', $body.attr('body-class'));

          $window.scrollTo(0, 0);
        });
    });
  });
