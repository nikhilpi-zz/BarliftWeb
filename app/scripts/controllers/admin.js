'use strict';

angular.module('barliftApp')
  .controller('AdminCtrl', function ($scope, User, Deals, AuthService, Venues) {
  // variables
  $scope.deals = [];
  $scope.venues = [];
  $scope.user = {};
  $scope.communities = [];
  $scope.today = new Date();
  $scope.selectedDeal = {
      name: 'Please select a deal',
    };

  User.getCurrent(function(res){ 
    $scope.user = res; 

    Deals.query({
      where: {
        //user: $scope.user.getPointer(),
      }
    },function(deals) { $scope.deals = deals; });

    Venues.query({
      where: {
        manager: $scope.user.getPointer()
      }
    },function(venues) { $scope.venues = venues; });
  });

  $scope.selectDeal = function(deal){
    $scope.selectedDeal = deal;
  };

  // logout
  $scope.logout = AuthService.logout;
});


