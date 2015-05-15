'use strict';

/**
 * @ngdoc directive
 * @name viewsApp.directive:dealcard
 * @description
 * # dealcard
 */
angular.module('barliftApp')
  .directive('dealCard', function () {
    return {
      templateUrl: 'views/dash/directives/deal-card.html',
      restrict: 'E',
      scope: {
        deal: '='
      },
      link: function postLink(scope, element, attrs) {
      	scope.today = new Date();

      	scope.sameDate = function(aDate, bDate) {
            return moment(aDate).dayOfYear() === moment(bDate).dayOfYear()
        };

        scope.pastDate = function(aDate, bDate) {
            return moment(aDate).dayOfYear() < moment(bDate).dayOfYear()
        };

        scope.isLocked = function(dealDate) {
            var lockDate = moment().endOf('day').add(3, 'day');
            return moment(dealDate).isBetween(moment().startOf('day'), lockDate);
        };
      }
    };
  });
