'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarFeedbackCtrl
 * @description
 * # BarFeedbackCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('FeedbackCtrl', function ($scope, $stateParams, Deals, User, Feedback) {
    $scope.deal = {};
    $scope.bar_name = {};
    $scope.selected = "parent";

    this.setSelected = function (selected) {
      $scope.selected = selected;
    }

    // get deal for feedback
    Deals.get({ objectId: $stateParams.dealId }, function(deal) {
      $scope.deal = deal;
      // get bar name for deal
      User.get({ objectId: deal.user }, function(bar) {
        $scope.bar_name = bar.bar_name;
      });
    });

    $scope.feedback = {};

    // submit form to Feedback class
    $scope.submit = function(){
      // add reference to the deal
      $scope.feedback.deal = $scope.deal.getPointer();
      // save to Parse
      Feedback.save($scope.feedback);
      // show thank you msg
      myCtrl.setSelected("submitted");

    };

  });
