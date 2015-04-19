'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarFeedbackCtrl
 * @description
 * # BarFeedbackCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('BarFeedbackCtrl', function ($scope, Deals, User) {
    $scope.deal = {};
    $scope.bar_name = {};

    Deals.get({ objectId: 'sWyd96eP6f' }, function(deal) {
      $scope.deal = deal;

      User.get({ objectId: deal.user.objectId }, function(bar) {
        $scope.bar_name = bar.bar_name;
      });
    });

  });
