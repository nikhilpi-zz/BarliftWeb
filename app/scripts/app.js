'use strict';

/**
 * @ngdoc overview
 * @name barliftApp
 * @description
 * # barliftApp
 *
 * Main module of the application.
 */
angular
  .module('barliftApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/bar', {
        templateUrl: 'views/bar.html',
        controller: 'BarCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, User) {
    Parse.initialize('5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC','G7yhVdBRY3S2jvjkHKddlsES5YZu1z99Nh9JPLTN');
    User.getUser();
    $rootScope.$on( '$routeChangeStart', function(event, next, current) {

      // if ($User.getUser() && next.templateUrl === 'views/login.html') {
      //   User.getUserRole(function(role){
      //   $scope.$apply(function() {
      //     $location.path('/'+ role.toLowerCase());
      //     });
      //   });
      // }
    });
  });
