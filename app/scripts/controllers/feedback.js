'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarFeedbackCtrl
 * @description
 * # BarFeedbackCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('FeedbackCtrl', function($scope, $stateParams, Deals, User, Feedback) {
    $scope.deal = {};
    $scope.feedback = {};
    $scope.submitted = false;
    $scope.update = false;
    $scope.deleted = false;

    // get deal from url
    Deals.get({
      objectId: $stateParams.dealId,
      include: "user",
      inlcude: "feedback"
    }, function(deal) {
      $scope.deal = deal;
      $scope.feedback.deal = $scope.deal.getPointer();
      $scope.feedback.name = $scope.deal.name;

      if (deal.feedback) {
        Feedback.get({
          objectId: deal.feedback
        }, function(feedback) {
          $scope.feedback = feedback;
          $scope.update = true;
        }, function(error) {
          console.log("Can't get feedback", error);
          $scope.deleted = "true";
        });
      }
    });

    // submit form to Feedback class
    $scope.submit = function() {
      if ($scope.update) {
        Feedback.update($scope.feedback);
      } else {
        Feedback.save($scope.feedback).$promise.then(function(feedback) {
          // set deal user and feedback pointers
          $scope.deal.user = getPointer($scope.deal.user.objectId, "_User");
          if ($scope.deleted) {
            $scope.deal.feedback = feedback.objectId;
          } else {
            $scope.deal.feedback = getPointer(feedback.objectId, "Feedback");
          }

          return Deals.update($scope.deal).$promise;
        }).then(function(status) {
          return;
        }, function(error) {
          console.log("Error saving object", error);
          return;
        });
      }
      // show thank you msg on submit
      $scope.submitted = true;
    };

    var getPointer = function(objectId, objClass) {
      return {
        objectId: objectId,
        __type: 'Pointer',
        className: objClass
      };
    };

  });
