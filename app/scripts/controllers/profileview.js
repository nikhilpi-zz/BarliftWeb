'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:ProfileviewCtrl
 * @description
 * # ProfileviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('ProfileviewCtrl', function ($scope, User, Venues) {
    $scope.venues = [];
    $scope.user = {};
    $scope.selectedVenue = Venues.newVenue($scope.user);
    $scope.alert = null;

    User.getCurrent(function(res){ 
      $scope.user = res; 
      Venues.query({
        where: {
          manager: $scope.user.getPointer()
        }
      },function(venues) { $scope.venues = venues; });
    });

    $scope.editVenue = function(deal){
      $scope.selectedVenue = deal;
    };

    $scope.deleteVenue = function(deal) {
      Venues.delete(deal,function(res){
        $scope.selectedVenue = Venues.newVenue($scope.user);
        $scope.$broadcast('venues-update');
      });
    };

    $scope.$on('venues-update', function(event, args) {
      $scope.selectedVenue = Venues.newVenue($scope.user);
      Venues.query({
        where: {
          manager: $scope.user.getPointer()
        }
      },function(venues) { $scope.venues = venues; });
    });

    $scope.handleStripe = function(status, response){
      if(response.error) {
        $scope.alert = response.error;
      } else {
        $scope.token = response.id;
        $scope.alert = null;
      }
    }


  });
