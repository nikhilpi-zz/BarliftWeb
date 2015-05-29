'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DealsviewCtrl
 * @description
 * # DealsviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
    .controller('DealsviewCtrl', function($rootScope, $scope, User, Deals, AuthService, Venues, $modal, Session, $http) {
        $scope.deals = [];
        $scope.venues = [];
        $scope.user = {};
        $scope.selectedDeal = {};
        $scope.selectedVenue = {};
        $scope.filter = {};
        $scope.today = new Date();
        $scope.logout = AuthService.logout;
        $scope.role = Session.userRole;
        $scope.filter.community = 'All communities';
        $scope.communities = ['All communities'];

        $scope.dealView = 'calendar';

        $http.get('https://api.parse.com/1/config').
          success(function(data, status, headers, config) {
            $scope.communities = $scope.communities.concat(data.params.communities);
        });

        $scope.$watch('filter.community', function(){
            var query = {};
            if($scope.filter.community != 'All communities'){
                query = {
                    where: {
                        community_name: $scope.filter.community
                    }
                };
            }
            $scope.$emit('deals-update', {query: query});
        });

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

        $scope.dealDate = function(date){
            return date.deal_start_date.valueOf();
        }

        $scope.logout = AuthService.logout;


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
              $scope.$emit('notify', {cssClass: 'alert-success', message:'Thank you for your feedback'});
            });
        };

    });
