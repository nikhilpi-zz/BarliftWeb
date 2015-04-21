var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, User, Deals, AuthService, Yelp, Venues) {
  // variables
  $scope.deals = [];
  $scope.venues = [];
  $scope.user = {};
  $scope.communities = [];
  $scope.today = new Date();

  User.getCurrent(function(res){ 
    $scope.user = res; 

    Deals.query({
      where: {
        //user: $scope.user.getPointer()
      }
    },function(deals) { $scope.deals = deals; });

    Venues.query({
      where: {
        manager: $scope.user.getPointer()
      }
    },function(venues) { $scope.venues = venues; });

  });


  // logout
  $scope.logout = AuthService.logout;
});


