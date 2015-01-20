'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:navbar
 * @description
 * # navbar
 */
angular.module('barliftApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      scope: {
        pages: '=',
      },
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
