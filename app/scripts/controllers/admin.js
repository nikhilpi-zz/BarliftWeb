var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, User, Deals, AuthService) {
  // variables
  $scope.deals = [];
  $scope.user = {};

  User.getCurrent(function(res){ 
    $scope.user = res; 
    console.log($scope.user.getPointer());
    Deals.query({
      where: { 
        user: $scope.user.getPointer()
      }
    },
    function(deals) { $scope.deals = deals; });
  });

  // logout
  $scope.logout = AuthService.logout;
});


