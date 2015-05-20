'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DealsviewCtrl
 * @description
 * # DealsviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
    .controller('DealsviewCtrl', function($rootScope, $scope, User, Deals, AuthService, Venues, $modal) {
        $scope.deals = [];
        $scope.venues = [];
        $scope.user = {};
        $scope.selectedDeal = {};
        $scope.selectedVenue = {};
        $scope.today = new Date();
        $scope.logout = AuthService.logout;

        $scope.dealView = 'calendar';

        User.getCurrent(function(res) {
            $scope.user = res;
            Deals.query({
                where: {}
            }, function(deals) {
                $scope.deals = deals;
            });

            Venues.query({
            }, function(venues) {
                $scope.venues = venues;
            });
        });

        $scope.$on('deals-update', function(event, args) {
            Deals.query(function(deals) {
                $scope.deals = deals;
            });
        });

        $scope.logout = AuthService.logout;


        /**
         * alerts - used for dynamic alerts in Notifications and Tooltips view
         */
        $scope.alerts = [];

        $scope.addAlert = function(alert) {
            $scope.alerts.push(alert);
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };


        // feedback modal
        $scope.openFeedback = function(dealID) {
            var modalInstance = $modal.open({
                templateUrl: 'views/dash/deals.feedback.html',
                controller: 'FeedbackCtrl',
                resolve: {
                    dealID: function() {
                        return dealID;
                    }
                }
            });

            modalInstance.result.then(function (feedback) {
              $scope.addAlert({type: 'success', msg: 'Thank you for your feedback!'});
            });
        };

    });
