var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, User, Deals, AuthService, $http) {
  // variables
  $scope.selectedDeal = {hello: 'world'};
  $scope.deals = [];
  $scope.user = {};
  $scope.communities = [];
  $scope.today = new Date();

  User.getCurrent(function(res){ 
    $scope.user = res; 
    Deals.query(function(deals) { $scope.deals = deals; });
  });

  // logout
  $scope.logout = AuthService.logout;
});


