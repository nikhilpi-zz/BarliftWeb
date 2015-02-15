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

app.directive('searchBar', function (){
  return {
    templateUrl: 'views/admin/search-bar.html',
    restrict: 'E'
  };
});

app.directive('dealOptions', function (){
  return {
    templateUrl: 'views/admin/deal-options.html',
    restrict: 'E'
  };
});

app.directive('dealGrid', function (){
  return {
    templateUrl: 'views/admin/deal-grid.html',
    restrict: 'E'
  };
});

app.directive('dealCard', function (){
  return {
    templateUrl: 'views/admin/deal-card.html',
    restrict: 'E',
    scope: {
      deal: '=',
    }
  };
});
