'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:sideNavigation
 * @description
 * # sideNavigation
 */
angular.module('barliftApp')
  .directive('sideNavigation', function ($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        // Call the metsiMenu plugin and plug it to sidebar navigation
            $timeout(function(){
                element.metisMenu();
            });
 
        // Enable initial fixed sidebar
        var sidebar = element.parent();
        sidebar.slimScroll({
            height: '100%',
            railOpacity: 0.9,
        });
      }
    };
  });
