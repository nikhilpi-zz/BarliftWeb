var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, User, Deals, AuthService, $http) {
  // variables
  $scope.deals = [];
  $scope.user = {};
  $scope.communities = [];
  $scope.today = new Date();

  User.getCurrent(function(res){ 
    $scope.user = res; 
    Deals.query(function(deals) { $scope.deals = deals; });
  });

  $http.get('https://api.parse.com/1/config').
    success(function(data, status, headers, config) {
      $scope.communities = data.params.communities;
  });

  // logout
  $scope.logout = AuthService.logout;
});


