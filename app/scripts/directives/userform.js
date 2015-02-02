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
            scope.user.location.latitude = newVal.geometry.location.D;
            scope.user.location.longitude = newVal.geometry.location.k;
            console.log(scope.user);
          };
        });

        scope.$watch('user', function(newV, oldV){
          console.log('Current user:');
          console.log(scope.user);
        });


        scope.updateUser = function(user){
          console.log(user);
          User.update(user, function(res){

          });
        };

      }
    };
  });
