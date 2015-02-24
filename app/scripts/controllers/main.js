'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('MainCtrl', function ($scope, Emails, $location, $window) {
    $scope.pagename = function() { 
      if (!$scope.selection){
        return $location.path(); 
      } else {
        $location.path('/' + $scope.selection); 
        return '/' + $scope.selection;
      }
    };

    $scope.getDevice = function() {
      var userAgent = $window.navigator.userAgent;
      var devices = {android: /Android/i, ios: /iPhone/i};

      for(var key in devices) {
        if (devices[key].test(userAgent)) {
          return key;
        }
       };
       return 'unknown';
    }

    console.log($scope.getDevice());

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.switchWithin = function(page) { 
      $scope.selection = page;
    };


    $scope.user = {email : null};
    $scope.addEmail = function(attr) {
      if (typeof $scope.user.email === 'undefined'){
        $scope.user.email = 'Invalid Email!';
      } else {
        Emails.save({email: $scope.user.email} ,function(res) {
            $scope.user.email = 'Thanks!';
        });
      }
    };

  });
