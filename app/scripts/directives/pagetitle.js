'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:pageTitle
 * @description
 * # pageTitle
 */
angular.module('barliftApp')
  .directive('pageTitle', function ($rootScope, $timeout) {
    return {
      link: function postLink(scope, element, attrs) {
        var listener = function(event, toState, toParams, fromState, fromParams) {
          // Default title - load on Dashboard 1
          var title = 'INSPINIA | Responsive Admin Theme';
          // Create your own title pattern
          if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
          $timeout(function() {
              element.text(title);
          });
        };
        $rootScope.$on('$stateChangeStart', listener);
      }
    };
  });
