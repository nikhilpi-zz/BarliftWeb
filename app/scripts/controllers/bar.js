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
    $scope.deals = [];
    $scope.selectedDeal = {};

    $scope.loadDeals = function(){
      Deals(User.getUser()).query({
        where: {
          user: User.getUserPointer()
        }}, 
        function(res){
          console.log(res);
          $scope.deals = res.results; 
        }
      );
    };

    $scope.loadDeals();

    $scope.saveDeal = function(deal){
      if (deal.objectId){
        Deals(User.getUser()).update(deal, function(res){
          console.log(res);
          $scope.loadDeals();
        })
      } else {
        deal.ACL = {};
        deal.ACL['*'] = {
          read: true
        };
        deal.ACL[User.getUser().id] = {
          read: true,
          write: true
        };
        deal.ACL['role:Admin'] = {
          read: true,
          write: true
        };
        deal.user = User.getUserPointer();
        Deals(User.getUser()).save(deal, function(res){
          console.log(res);
          $scope.loadDeals();
        })

      }
    };

    $scope.selectDeal = function(deal){
      $scope.selectedDeal = deal; 
    };

    $scope.logout = function(){
      User.logout();
      $location.path('/login');
    };
  });
