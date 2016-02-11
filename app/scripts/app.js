'use strict';

angular
  .module('lifeWebsite', [
    'ngLodash',
    'ui.bootstrap',
    'angular-ladda',
    'duScroll',
    'sticky',
    'life.common',
    'sko.addThis',
  ])
  .config(function ($locationProvider, userServiceProvider, addThisProvider) {
  	$locationProvider.html5Mode(true);
    userServiceProvider.setUrl('http://localhost:3000/api/v1/');
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
          var $body = $('<span>'+response.data+'</span>');
          // Replace existing content
          $('[async-body]').children().remove();
          $('[async-body]').append( $compile($body)($rootScope) );
          $window.scrollTo(0, 0);
        });
    });
  });
