var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, User, Deals, AuthService) {
  // variables
  $scope.deals = [];
  $scope.user = {};

  $scope.userName = 'Example user';
  $scope.helloText = 'Welcome in SeedProject';
  $scope.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';


  User.getCurrent(function(res){ 
    $scope.user = res; 
    Deals.query(function(deals) { $scope.deals = deals; });
  });

  // logout
  $scope.logout = AuthService.logout;
});


