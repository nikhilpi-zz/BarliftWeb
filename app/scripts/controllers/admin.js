var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, User, Deals, AuthService) {
  // variables
  $scope.deals = [];
  $scope.user = {};

  User.getCurrent(function(res){ $scope.user = res; });
  Deals.query(function(deals) { $scope.deals = deals; });

  // logout
  $scope.logout = AuthService.logout;
});


