'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:compareTo
 * @description
 * # compareTo
 */
angular.module('barliftApp')
  .directive('compareTo', function () {
    return {
      require: "ngModel",
      scope: {
          otherModelValue: "=compareTo"
      },
      link: function postLink(scope, element, attrs, ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
            return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
            ngModel.$validate();
        });
      }
    };
  });
