'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarCtrl
 * @description
 * # BarCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('BarCtrl', function ($scope, $location, User, Deals, AuthService) {
    $scope.user = {};
    $scope.deals = [];

    User.getCurrent(function(res){
      $scope.user = res;
      Deals.query({
          where: {
            user: $scope.user.getPointer
          }
        }, 
        function(res){
          $scope.deals = res; 
        }
      );
    });

    $scope.selectedDeal = Deals.newDeal($scope.user);

    $scope.newDeal = function(){
      $scope.selectedDeal = Deals.newDeal($scope.user);
    };

    $scope.selectDeal = function(deal){
      $scope.selectedDeal = deal; 
    };

    $scope.logout = AuthService.logout;

  });
