'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DealsviewCtrl
 * @description
 * # DealsviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
    .controller('DealsviewCtrl', function($rootScope, $scope, User, Deals, AuthService, Venues) {
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


    });
