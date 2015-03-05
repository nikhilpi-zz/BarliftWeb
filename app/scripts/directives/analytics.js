'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:analytics
 * @description
 * # analytics
 */
angular.module('barliftApp')
  .directive('analytics', function () {
    return {
      templateUrl: 'views/analytics.html',
      restrict: 'E',
      scope: {
        deals: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.selected = scope.deals[0];

        scope.exampleData = [
          {
            key: "Gender",
            values: [
              ["Male", 70 ],
              ["Female" , 30 ]
            ]
          }
        ];


        scope.exampleData2 = [
          {
            key: "One",
            y: 5
          },
          {
            key: "Two",
            y: 2
          },
          {
            key: "Three",
            y: 9
          },
          {
            key: "Four",
            y: 7
          },
          {
            key: "Five",
            y: 4
          },
          {
            key: "Six",
            y: 3
          },
          {
            key: "Seven",
            y: 9
          }
        ];

        scope.xFunction = function(){
          return function(d) {
            return d.key;
          };
        };

        scope.yFunction = function(){
          return function(d) {
            return d.y;
          };
        };

      }
    };
  });
