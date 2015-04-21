'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:barfeedback
 * @description
 * # barfeedback
 */
angular.module('barliftApp')
  .directive('feedbackForm', function (Deals, Feedback) {
    return {
      templateUrl: 'views/dash/directives/feedback-form.html',
      restrict: 'E',
      require:"^ngController",
      link: function postLink(scope, element, attrs, myCtrl) {
        scope.feedback = {};

        // submit form to Feedback class
        scope.submit = function(){
          // add reference to the deal
          scope.feedback.deal = scope.deal.getPointer();
          // save to Parse
          Feedback.save(scope.feedback);
          // show thank you msg
          myCtrl.setSelected("submitted");

        };

      }
    };
  });
