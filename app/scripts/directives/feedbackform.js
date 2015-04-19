'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:barfeedback
 * @description
 * # barfeedback
 */
angular.module('barliftApp')
  .directive('feedbackForm', function () {
    return {
      templateUrl: 'views/dash/directives/feedback-form.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
