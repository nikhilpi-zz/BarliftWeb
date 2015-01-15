'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:scrollOnClick
 * @description
 * # scrollOnClick
 */
angular.module('barliftApp')
  .directive('scrollOnClick', function () {
    return {
      restrict: 'A',
      link: function(scope, $elm, attrs) {
        var idToScroll = attrs.href;
        $elm.on('click', function() {
          var $target;
          if (idToScroll) {
            $target = $(idToScroll);
          } else {
            $target = $elm;
          }
          $("body").animate({scrollTop: $target.offset().top}, "slow");
        });
      }
    }
  });
