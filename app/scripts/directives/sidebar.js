'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:sideBar
 * @description
 * # sideBar
 */
angular.module('barliftApp')
  .directive('sideBar', function () {
    return {
      templateUrl: 'views/sidebar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
