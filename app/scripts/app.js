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
    'angularPayments'
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
  .config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, USER_ROLES) {
    $urlRouterProvider.otherwise("/");
    Stripe.setPublishableKey('pk_test_ilf0PC8WC51SBXQMp8zQFjXi');

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
      // landing page 
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
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('home.about', {
        url: "/about",
        templateUrl: 'views/landingpage/home.about.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('home.team', {
        url: "/team",
        templateUrl: 'views/landingpage/home.team.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      // login/register
      .state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('register', {
        url: "/register",
        templateUrl: 'views/register.html',
        controller: 'LoginCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('reset', {
        url: "/reset",
        templateUrl: 'views/reset.html',
        controller: 'LoginCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      // dashabord
      .state('dash', {
        abstract: true,
        url: "/admin",
        controller: 'AdminCtrl',
        templateUrl: "views/dash/common/content.html",
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('dash.main', {
        url: "/main",
        controller: 'DashboardCtrl',
        templateUrl: 'views/dash/dash.main.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'angles',
                files: ['js/plugins/chartJs/angles.js', 'js/plugins/chartJs/Chart.min.js']
              }
            ]);
          }
        }
      })
      // feedback
      .state('feedback', {
        url: "/feedback/:dealId",
        templateUrl: 'views/dash/feedback.html',
        controller: 'FeedbackCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      // deals
      .state('deals', {
        abstract: true,
        url: "/deals",
        templateUrl: 'views/dash/common/content.html',
        controller: 'DealsviewCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('deals.list', {
        url: "/list",
        templateUrl: 'views/dash/deals.list.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('deals.builder', {
        url: "/builder/:selectedDeal",
        templateUrl: 'views/dash/deals.builder.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                name: 'datePicker',
                files: ['css/plugins/datapicker/angular-datapicker.css','js/plugins/datapicker/datePicker.js']
              }
            ]);
          }
        }
      })
      .state('deals.deal', {
        url: "/deal/:selectedDeal",
        templateUrl: 'views/dash/deals.deal.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        files: ['js/plugins/chartJs/Chart.min.js']
                    },
                    {
                        name: 'angles',
                        files: ['js/plugins/chartJs/angles.js']
                    }
                ]);
            }
        }
      })
      // promo
      .state('promo', {
        abstract: true,
        url: "/promo",
        templateUrl: 'views/dash/common/content.html',
        controller: 'DealsviewCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('promo.push', {
        url: "/push",
        templateUrl: 'views/dash/promo.push.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        },
        resolve: {
          loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
              {
                insertBefore: '#loadBefore',
                files: ['css/plugins/fullcalendar/fullcalendar.css','js/plugins/fullcalendar/fullcalendar.min.js','js/plugins/fullcalendar/gcal.js']
              }
            ]);
          }
        }
      })
      // profile
      .state('profile', {
        abstract: true,
        url: "/profile",
        templateUrl: 'views/dash/common/content.html',
        controller: 'ProfileviewCtrl',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('profile.venues', {
        url: "/venues",
        templateUrl: 'views/dash/profile.venues.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('profile.payment', {
        url: "/payment",
        templateUrl: 'views/dash/profile.payment.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        },
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        files: ['css/plugins/steps/jquery.steps.css']
                    }
                ]);
            }
        }
      })
      .state('profile.payment.one_sub', {
        url: "/step_one",
        templateUrl: 'views/dash/payments_wizard/one_sub.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('profile.payment.two_card', {
        url: "/step_two",
        templateUrl: 'views/dash/payments_wizard/two_card.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      })
      .state('profile.payment.three_review', {
        url: "/step_three",
        templateUrl: 'views/dash/payments_wizard/three_review.html',
        data: {
          authorizedRoles: [USER_ROLES.all]
        }
      });

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
