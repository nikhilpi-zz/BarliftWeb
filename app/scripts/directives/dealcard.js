'use strict';

/**
 * @ngdoc directive
 * @name viewsApp.directive:dealcard
 * @description
 * # dealcard
 */
angular.module('barliftApp')
  .directive('dealCard', function ($modal) {
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

        scope.open = function () {
          var modalInstance = $modal.open({
            templateUrl: 'views/dash/directives/deal-repeat-modal.html',
            resolve: {
              deal: function () {
                return scope.deal;
              }
            },
            controller: function($scope, $modalInstance, deal, $state, Deals){
              $scope.deal = deal;
              $scope.newThings = {date: new Date()};

              $scope.dup = function () {
                  $state.go('deals.builder',{selectedDeal: deal.objectId, dup: true})
                  $modalInstance.close();
              };

              $scope.repeat = function () {
                var newDeal = angular.copy($scope.deal);
                newDeal.objectId = null;
                var newDoY = moment($scope.newThings.date).dayOfYear();
                var oldDoY = moment($scope.deal.deal_start_date).dayOfYear();
                var diff = newDoY - oldDoY;
                newDeal.deal_start_date = moment(newDeal.deal_start_date).add(diff, 'days').toDate();
                newDeal.deal_end_date = moment(newDeal.deal_end_date).add(diff, 'days').toDate();
                Deals.save(newDeal).$promise.then(
                function(res){
                  $scope.$emit('deals-update');
                  $scope.$emit('notify', {cssClass: 'alert-success', message:'Your Deal has been added'});
                  $modalInstance.close();
                },
                function(err){
                  scope.alert.text = err.data.error;
                });
              };


              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
            }
          });
        };

      }
    };
  });
