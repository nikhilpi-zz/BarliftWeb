'use strict';

angular.module('barliftApp')
  .controller('AdminCtrl', function ($scope, User, Deals, AuthService, Venues) {
  // variables
  $scope.deals = [];
  $scope.venues = [];
  $scope.user = {};
  $scope.selectedDeal = {
      name: 'Please select a deal',
    };
  $scope.dealView ='list';
  $scope.dealFilter = 'all';

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

  $scope.$on('deals-update', function(event, args) {
    Deals.query(function(deals) { $scope.deals = deals; });
  });

  $scope.selectDeal = function(deal){
    $scope.selectedDeal = deal;
  };

  // logout
  $scope.logout = AuthService.logout;
  
});


