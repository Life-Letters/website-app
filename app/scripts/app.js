'use strict';

angular
  .module('websiteApp', [
    'ngLodash',
    'ui.bootstrap',
    'angular-ladda',
    'duScroll',
    'sticky',
    'sko.addThis',
    'life.common',
  ])
  .config(function ($locationProvider, usersProvider, addThisProvider) {
  	$locationProvider.html5Mode(true);
    usersProvider.setUrl( window.urls.userService );
    addThisProvider.setId('ra-5406ccc677c1f23f');
  })
  .run(function($rootScope, $http, $location, $compile, $window) {
    // Make some things available to the whole system
    // $rootScope.globals = globals;
    
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
