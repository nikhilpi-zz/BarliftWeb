'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:searchBar
 * @description
 * # searchBar
 */
angular.module('barliftApp')
  .directive('searchBar', function () {
    return {
      templateUrl: 'views/searchbar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
