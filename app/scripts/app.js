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
    'ui.bootstrap',
    'ngMaterial'
  ])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'Admin',
    editor: 'User',
    bar: 'Bar'
  })
  .config(function ($routeProvider, USER_ROLES) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/about', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/team', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      })
      .when('/bar', {
        templateUrl: 'views/bar.html',
        controller: 'BarCtrl',
        data: {
          authorizedRoles: [USER_ROLES.bar]
        }
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .run(function($rootScope, $http, $location, $window, USER_ROLES, AUTH_EVENTS, AuthService, Session) {
    $http.defaults.headers.common['X-Parse-Application-Id'] = '5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC';
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'pMT9AefpMkJfbcJ5fTA2uOGxwpitMII7hpCt8x4O';

    if ($window.sessionStorage['session']) {
      var session = JSON.parse($window.sessionStorage['session']);
      Session.create(session.userId, session.userName, session.sessionToken, session.userRole);
    }

    $rootScope.$on('$routeChangeStart', function (event, next) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthService.isAuthenticated()) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          $location.path('/login');
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          $location.path('/login');
        }
      }
    });
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .factory('AuthInterceptor', function ($rootScope, $q,
                                        AUTH_EVENTS) {
    return {
      responseError: function (response) { 
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  });
