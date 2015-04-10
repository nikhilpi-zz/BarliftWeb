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
    'ui.router'
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
  .config(function ($stateProvider, $urlRouterProvider, $animateProvider, $httpProvider, USER_ROLES) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        abstract: true,
        templateUrl: 'views/landingpage/home.partial.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('home.index', {
        url: "/",
        templateUrl: 'views/landingpage/home.index.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('home.about', {
        url: "/about",
        templateUrl: 'views/landingpage/home.about.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('home.team', {
        url: "/team",
        templateUrl: 'views/landingpage/home.team.html',
        controller: 'MainCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('home.login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('dash', {
        abstract: true,
        url: "/admin",
        templateUrl: "views/dash/common/content.html",
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('dash.main', {
        url: "/main",
        templateUrl: 'views/dash/dash.main.html',
        controller: 'AdminCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('dash.minor', {
        url: "/minor",
        templateUrl: 'views/dash/dash.minor.html',
        controller: 'AdminCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      });

      $animateProvider.classNameFilter(/carousel/);

      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);

  })
  .run(function($rootScope, $http, $location, $window, $state, AUTH_EVENTS, AuthService, Session) {
    $rootScope.$state = $state;

    $http.defaults.headers.common['X-Parse-Application-Id'] = '5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC';
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'pMT9AefpMkJfbcJ5fTA2uOGxwpitMII7hpCt8x4O';

    if ($window.sessionStorage['session']) {
      var session = JSON.parse($window.sessionStorage['session']);
      Session.create(session.userId, session.userName, session.sessionToken, session.userRole);
    }

    $rootScope.$on('$stateChangeStart', function (event, next) {
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
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
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
