'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:PromoteviewCtrl
 * @description
 * # PromoteviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('PromoteviewCtrl', function ($scope, User, CloudCode, ParseTypes) {
    $scope.deals = [];
    $scope.user = {};
    User.getCurrent(function(res){ 
      $scope.user = res; 
    });

    CloudCode.call('possibleMainDeals', {}).then(
      function(res){
        var processed = res.result.map(function(x){
          return ParseTypes.resProcess(x,'Deal');
        });
        console.log(processed);
        $scope.deals = processed;
      });
    

  });
