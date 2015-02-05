'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealList
 * @description
 * # dealList
 */
angular.module('barliftApp')
  .directive('dealList', function ($window) {
    return {
      templateUrl: 'views/deallist.html',
      restrict: 'E',
      scope: {
        deals: '=',
        select: '='
      },
      link: function postLink(scope, element, attrs) {

        var height = $window.innerHeight - element.find('md-content')[0].offsetTop;
        element.find('md-content').css('height',height+'px')


        $(window).resize(function(){
          scope.$apply(function(){
            var height = $window.innerHeight - element.find('md-content')[0].offsetTop;
            element.find('md-content').css('height',height+'px')
          });
        });

        scope.selectDeal = function(deal){
          scope.select = deal;
        };
      }
    };
  });
