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
      console.log(window.urls.cookies);
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
  .run(function ($rootScope, $http, $location, $compile, $window, $, $cookies) {
    // Make some things available to the whole system
    // $rootScope.globals = globals;
    
    $cookies.put('bar', 'foo');

    var initPageLoad = true;
    $rootScope.$on('$locationChangeStart', function(evt, newUrl, oldUrl) {
      if (initPageLoad) { initPageLoad = false; return; }
      // Ignore param changes
      if (newUrl.replace(/\?.*/, '') === oldUrl.replace(/\?.*/, '')) { return; }

      // Asyncronously fetch the content
      $http.get( newUrl+(newUrl.match(/\?/)?'&':'?')+'mode=body' )
        .then(function(response) {
          // Compile to ensure any included angular code is initialised
          var $body = $('[async-body]', $('<span>'+response.data+'</span>'));
          // Replace existing content
          $('[async-body]').children().remove();
          $('[async-body]').append( $compile($body)($rootScope) );

          $rootScope.$emit('nav:highlight', $body.attr('nav-highlight'));

          // Replace the current theme tag
          $('body').attr('class', $body.attr('body-class'));

          $window.scrollTo(0, 0);
        });
    });
  });
