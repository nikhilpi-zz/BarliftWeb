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
    console.log($scope.bar);
    $scope.deals = []
    $scope.selectedDeal = {}

    Deals(User.getUser()).query({
      where: {
        user: User.getUserPointer()
      }}, 
      function(res){
        console.log(res);
        $scope.deals = res.results; 
      }
    );

    $scope.selectDeal = function(deal){
      $scope.selectedDeal = deal; 
      Deals.saveDeal(User.getUser(), deal)
    };

    $scope.logout = function(){
      User.logout();
      $location.path('/login');
    };
  });
