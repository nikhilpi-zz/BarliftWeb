'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:sideNavigation
 * @description
 * # sideNavigation
 */
angular.module('barliftApp')
  .directive('sideNavigation', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        $timeout(function(){
          element.metisMenu();
        });
      }
    };
  });
