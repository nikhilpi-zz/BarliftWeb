'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:PromoteviewCtrl
 * @description
 * # PromoteviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('PromoteviewCtrl', function ($scope, CloudCode, ParseTypes) {
    $scope.deals = [];

    CloudCode.call('possibleMainDeals', {}).then(
      function(res){
        var processed = res.result.map(function(x){
          return ParseTypes.resProcess(x,'Deal');
        });
        $scope.deals = processed;
      });
    

  });
