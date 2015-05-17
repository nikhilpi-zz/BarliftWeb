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
        'ui.router',
        'oc.lazyLoad',
        'ui.calendar',
        'angularPayments',
        'cgNotify'
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
    .run(function($rootScope, $http, $window, $state, AUTH_EVENTS, AuthService, Session, notify) {
        $rootScope.$state = $state;

        $http.defaults.headers.common['X-Parse-Application-Id'] = '5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC';
        $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'pMT9AefpMkJfbcJ5fTA2uOGxwpitMII7hpCt8x4O';


        if ($window.sessionStorage['session']) {
            var session = JSON.parse($window.sessionStorage['session']);
            Session.create(session.userId, session.userName, session.sessionToken, session.userRole);
        }
        notify.config({
            position: 'center'
        });

        $rootScope.$on('notify', function(event, args) {
            notify({
                message: args.message,
                classes: args.cssClass,
                templateUrl: 'views/dash/common/notify.html'
            });
        });

        $rootScope.$on('$stateChangeStart', function(event, next) {
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    $state.go('login');
                } else {
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    $state.go('login');
                }
            }
        });
    })
    .factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function(response) {
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
