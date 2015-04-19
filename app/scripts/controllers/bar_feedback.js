'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarFeedbackCtrl
 * @description
 * # BarFeedbackCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('BarFeedbackCtrl', function ($scope, Deals, User, Feedback) {
    $scope.deal = {};
    $scope.bar_name = {};

    // get deal for feedback
    Deals.get({ objectId: 'cvMm6uOKQk' }, function(deal) {
      $scope.deal = deal;

      // get bar name for deal
      User.get({ objectId: deal.user.objectId }, function(bar) {
        $scope.bar_name = bar.bar_name;
      });

    });

    // feedback test
    //Feedback.get({ objectId: 'sfzHwRhRhx' }, function(feedback) {
    //  console.log(feedback);
    //});

  });
