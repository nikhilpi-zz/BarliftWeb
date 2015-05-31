'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarFeedbackCtrl
 * @description
 * # BarFeedbackCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
    .controller('EmailFeedbackCtrl', function($scope, $stateParams, Feedback, CloudCode) {
        $scope.deal = {};
        $scope.feedback = {};
        $scope.update = false;

        // get deal
        CloudCode.call('getDeal', {
            dealId: $stateParams.dealId
        }).then(function(res) {
            $scope.deal = res.result;
            if (res.result.feedback) {
                $scope.feedback = res.result.feedback;
                $scope.update = true;
            };
            // console.log(JSON.stringify(res.result, null, 2));
        });

        // submit form to Feedback class
        $scope.submit = function() {
            // set feedback deal pointer and name
            $scope.feedback.deal = getPointer($scope.deal.objectId, "Deal");
            $scope.feedback.name = $scope.deal.name;

            // save feedback
            if ($scope.update) {
                delete $scope.feedback["__type"];
                delete $scope.feedback["className"];
                Feedback.update($scope.feedback);
            } else {
                Feedback.save($scope.feedback).$promise.then(function(feedback) {
                    return feedback;
                }).then(function(feedback) {
                    // set deal feedback pointer
                    CloudCode.call('updateDealFeedback', {
                        dealId: $stateParams.dealId,
                        feedbackId: feedback.objectId
                    }).then(function(deal) {
                        console.log(JSON.stringify(deal, null, 2));
                    });
                    return;
                }, function(error) {
                    console.log("Error saving object", error);
                    return;
                })
            };

            // show thank you msg on submit
            $scope.$emit('notify', {
                cssClass: 'alert-success',
                message: 'Thank you for your feedback'
            });
        };

        var getPointer = function(objectId, objClass) {
            return {
                objectId: objectId,
                __type: 'Pointer',
                className: objClass
            };
        };

    });
