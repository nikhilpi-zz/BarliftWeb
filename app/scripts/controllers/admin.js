var app = angular.module('barliftApp');

app.controller('AdminCtrl', function ($scope, User, Deals, AuthService, $http, Yelp) {
  // variables
  $scope.selectedDeal = {hello: 'world'};
  $scope.deals = [];
  $scope.user = {};
  $scope.communities = [];
  $scope.today = new Date();

  User.getCurrent(function(res){ 
    $scope.user = res; 

    Deals.query({
      where: {
        user: $scope.user.getPointer()
      }
    },function(deals) { $scope.deals = deals; });
  });

  Yelp.getBusiness('la-macchina-cafe-evanston',function(res){
    console.log(res);
  });

  // logout
  $scope.logout = AuthService.logout;
});


