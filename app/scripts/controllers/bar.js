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

    Deals.getUserDeals(User.getUser(), function(res){
      console.log(res);
    });

    $scope.logout = function(){
      User.logout();
      $location.path('/login');
    };
  });
