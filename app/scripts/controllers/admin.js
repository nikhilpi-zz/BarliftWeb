var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, Deals, AuthService) {
  // variables
  $scope.deals = [];

  // get all deals
  Deals.query(function(deals) { $scope.deals = deals; });

  // logout
  $scope.logout = AuthService.logout;
});


app.directive('navBar', function (){
  return {
    templateUrl: 'views/admin/nav-bar.html',
    restrict: 'E'
  };
});


