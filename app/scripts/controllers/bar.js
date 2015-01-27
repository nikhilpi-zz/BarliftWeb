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

    $scope.user = User.getUser();
    $scope.deals = [];
    $scope.selectedDeal = Deals($scope.user).newDeal();

    $scope.loadDeals = function(){
      Deals(User.getUser()).query({
        where: {
          user: User.getUserPointer()
        }}, 
        function(res){
          $scope.deals = res; 
        }
      );
    };

    $scope.loadDeals();

    $scope.selectDeal = function(deal){
      $scope.selectedDeal = deal; 
    };

    $scope.logout = function(){
      User.logout();
      $location.path('/login');
    };
  });
