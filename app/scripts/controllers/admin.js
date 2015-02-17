var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, Deals, AuthService) {
  // variables
  $scope.deals = [];

  // get all deals
  Deals.query(function(deals) { $scope.deals = deals; });

  // logout
  $scope.logout = AuthService.logout;
});


