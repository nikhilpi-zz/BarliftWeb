'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DealsviewCtrl
 * @description
 * # DealsviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('DealsviewCtrl', function ($rootScope, $scope, User, Deals, AuthService, Venues, $stateParams) {
    $scope.deals = [];
    $scope.venues = [];
    $scope.user = {};
    $scope.selectedDeal = {};
    $scope.selectedVenue = {};

    $scope.dealView ='list';
    $scope.dealFilter = 'all';

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      loadSelectedDeal(toParams.selectedDeal);
    });

    function loadSelectedDeal(objID){
      Deals.get({objectId: objID}, function(res){
        $scope.selectDeal = res;
        Venues.get({objectId: $scope.selectDeal.venue}, function(res){
          console.log(res);
          $scope.selectedVenue = res;
        })
      });
    }

    User.getCurrent(function(res){ 
      $scope.user = res; 
      Deals.query({
        where: {}
        },function(deals){$scope.deals = deals;}
      );

      Venues.query({
        where: { manager: $scope.user.getPointer()}
        },function(venues){$scope.venues = venues;}
      );
    });

    $scope.$on('deals-update', function(event, args) {
      Deals.query(function(deals) { $scope.deals = deals; });
    });

    $scope.logout = AuthService.logout;

  });
