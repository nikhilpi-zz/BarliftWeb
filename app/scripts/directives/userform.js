'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:userForm
 * @description
 * # userForm
 */
angular.module('barliftApp')
  .directive('userForm', function (User) {
    return {
      templateUrl: 'views/userform.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      link: function postLink(scope, element, attrs) {

        scope.details = {};
        scope.$watch('details', function(newVal, oldVal){
          if(newVal.geometry){
            scope.user.location.latitude = newVal.geometry.location.k;
            scope.user.location.longitude = newVal.geometry.location.D;
          };
        });

        scope.updateUser = function(user){
          User.update(user, function(res){
          });
        };

      }
    };
  });
