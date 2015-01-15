'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('HeaderCtrl', ['$location', 
    function ($scope,$location) {
      $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
      };
  }]);
