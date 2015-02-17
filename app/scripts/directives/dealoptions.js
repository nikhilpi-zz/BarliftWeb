'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealOptions
 * @description
 * # dealOptions
 */
angular.module('barliftApp')
  .directive('dealOptions', function () {
    return {
      templateUrl: 'views/dealoptions.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
