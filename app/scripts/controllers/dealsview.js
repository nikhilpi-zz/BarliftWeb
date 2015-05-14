'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DealsviewCtrl
 * @description
 * # DealsviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
    .controller('DealsviewCtrl', function($rootScope, $scope, User, Deals, AuthService, Venues, $stateParams) {
        $scope.deals = [];
        $scope.venues = [];
        $scope.user = {};
        $scope.selectedDeal = {};
        $scope.selectedVenue = {};
        $scope.today = new Date();

        $scope.dealView = 'calendar';
        $scope.dealFilter = 'all';

        User.getCurrent(function(res) {
            $scope.user = res;
            Deals.query({
                where: {}
            }, function(deals) {
                $scope.deals = deals;
            });

            Venues.query({
                where: {
                    manager: $scope.user.getPointer()
                }
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

        // deal filtering
        $scope.dealDate = function(deal) {
            return deal.deal_start_date.valueOf();
        };

        $scope.sameDate = function(aDate, bDate) {
            return moment(aDate).dayOfYear() === moment(bDate).dayOfYear()
        };

        $scope.pastDate = function(aDate, bDate) {
            return moment(aDate).dayOfYear() < moment(bDate).dayOfYear()
        };


        $scope.filterDeals = function(value, index) {
            console.log($scope.dealFilter);
            if ($scope.dealFilter === 'all') {
                return true;
            } else if ($scope.dealFilter === 'future') {
                return value.deal_start_date > $scope.today;
            } else if ($scope.dealFilter === 'today') {
                return $scope.sameDate(value.deal_start_date, $scope.today)
            } else if ($scope.dealFilter === 'past') {
                return $scope.pastDate(value.deal_start_date, $scope.today);
            } else {
                return false;
            }
        };

    });
