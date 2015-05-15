'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('MainCtrl', function ($scope, Emails, $location, $window, $http, $state) {

    $scope.$state = $state;
    
    $scope.getDevice = function() {
      var userAgent = $window.navigator.userAgent;
      var devices = {android: /Android/i, ios: /iPhone/i};

      for(var key in devices) {
        if (devices[key].test(userAgent)) {
          return key;
        }
       }
       return 'unknown';
    };

    $scope.isActive = function(state) {
      return state === $state.get();
    }

    $scope.slides = [
      {
        image: 'images/phone-slides/1.png'
      },
      {
        image: 'images/phone-slides/2.png'
      },
      {
        image: 'images/phone-slides/3.png'
      },
      {
        image: 'images/phone-slides/4.png'
      }
    ];

  });
