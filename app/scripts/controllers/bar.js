'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:BarCtrl
 * @description
 * # BarCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('BarCtrl', function ($scope, $location, User, Deals) {

    if (User.isLoggedIn()){
      User.checkUserRole('Bar', function(isRole){
        if (!isRole){
          $scope.$apply(function() {
            $location.path('/login');
          });
        }
      });
    } else {
      $location.path('/login');
    }

    $scope.bar = User.getUser();
    $scope.deals = []
    $scope.selectedDeal = {}

    Deals.getUserDeals(User.getUser(), function(res){
      $scope.$apply(function() {
        $scope.deals = res; 
      });
    });

    $scope.selectDeal = function(deal){
      $scope.selectedDeal = deal; 
      Deals.saveDeal(User.getUser(), deal)
    };

    $scope.logout = function(){
      User.logout();
      $location.path('/login');
    };
  });
