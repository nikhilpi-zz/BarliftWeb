'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealForm
 * @description
 * # dealForm
 */
angular.module('barliftApp')
  .directive('dealForm', function () {
    return {
      templateUrl: 'views/dealform.html',
      restrict: 'E',
      scope: {
        deal: '='
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
