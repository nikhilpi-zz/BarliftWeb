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

    $scope.user = {email : null, barName : null, isBar : false};
    $scope.addEmail = function(attr) { //create a new movie. Issues a POST to /api/movies
      if (typeof $scope.user.email === 'undefined'){
        $scope.user.email = 'Invalid Email!';
      } else {
        if(attr === 'isBar'){
          $scope.user.isBar = true;
        } else {
          $scope.user.isBar = false;
        }
        Emails.save({email: $scope.user.email, isBar: $scope.user.isBar, name: $scope.user.barName} ,function(res) {
            $scope.user.email = 'Thanks!';
        });
      }
    };

  });
