'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('MainCtrl', function ($scope, Emails, $location) {
    $scope.pagename = function() { 
      if (!$scope.selection){
        return $location.path(); 
      } else {
        return '/' + $scope.selection;
      }
    };

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
