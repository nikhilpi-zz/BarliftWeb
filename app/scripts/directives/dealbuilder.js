'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealBuilder
 * @description
 * # dealBuilder
 */
angular.module('barliftApp')
  .directive('dealBuilder', function (Deals, Venues, $http, $stateParams, $state, $rootScope, $filter) {
    return {
      templateUrl: 'views/dash/directives/deal-builder.html',
      restrict: 'E',
      scope:{
        user: '=',
        venues: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.alert = {};
        scope.today = {};
        scope.today.date = new Date();
        $http.get('https://api.parse.com/1/config').
          success(function(data, status, headers, config) {
            scope.communities = data.params.communities;
            loadDeal();
        });

        function loadDeal(){
          if($stateParams.selectedDeal){
            Deals.get({objectId: $stateParams.selectedDeal}, function(res){
              scope.deal = res;
              console.log(scope.deal.community_name);
              if($stateParams.dup){
                scope.deal.objectId = null;
                scope.deal.num_accepted = 0;
                scope.deal.whos_going = [];
                scope.deal.main = false;
              }
            });
          } else {
            scope.deal = Deals.newDeal(scope.user);
          }
        }

        scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        scope.opened={};

        scope.open = function($event,id) {
          $event.preventDefault();
          $event.stopPropagation();

          scope.opened[id] = true;
        };

        scope.$watch('deal.deal_end_date', function(){      
          if(scope.deal && moment(scope.deal.deal_end_date).isBefore(scope.deal.deal_start_date)){
            scope.alert.text = "End time must come after start time";
          } else {
            scope.alert.text = null;
          }
        });

        scope.$watch('deal.venue', function(){      
          if(scope.deal && scope.deal.venue){
            scope.deal.image_url = $filter('filter')(scope.venues, {objectId: scope.deal.venue})[0].image_url;
          } else if(scope.deal){
            scope.deal.image_url = null;
          }
        });

        scope.addSubDeal = function(){
          scope.deal.add_deals.push('');
        };

        scope.removeSubDeal = function(i){
          scope.deal.add_deals.splice(i,1);
        };

        scope.deleteDeal = function() {
          Deals.delete(scope.deal).$promise.then(
            function(res){
              scope.deal = Deals.newDeal(scope.user);
              $rootScope.$broadcast('deals-update', {query: {}});
              scope.$emit('notify', {cssClass: 'alert-success', message:'Your Deal has been deleted'});
              $state.go('deals.list');
            },
            function(err){
              scope.alert.text = err.data.error;
            });
        };

        scope.saveDeal = function(){
          scope.deal.community_name = scope.deal.community_name.replace(' ','');
          Deals.save(scope.deal).$promise.then(
            function(res){
              scope.deal = Deals.newDeal(scope.user);
              $rootScope.$broadcast('deals-update', {query: {}});
              scope.$emit('notify', {cssClass: 'alert-success', message:'Your Deal has been added'});
              $state.go('deals.list');
            },
            function(err){
              scope.alert.text = err.data.error;
            });
        };

        scope.duplicateDeal = function(){
          scope.deal.objectId = null;
        };

        scope.updateDeal = function(){
          scope.deal.community_name = scope.deal.community_name.replace(' ','');
          Deals.update(scope.deal).$promise.then(
            function(res){
              scope.deal = Deals.newDeal(scope.user);
              $rootScope.$broadcast('deals-update', {query: {}});
              scope.$emit('notify', {cssClass: 'alert-success', message:'Your Deal has been updated'});
              $state.go('deals.list');
            },
            function(err){
              scope.alert.text = err.data.error;
            });
        };


      }
    };
  })
  .directive('datepickerPopup', function (){
    return {
        restrict: 'EAC',
        require: 'ngModel',
        link: function(scope, element, attr, controller) {
        //remove the default formatter from the input directive to prevent conflict
        controller.$formatters.shift();
        }
    }
});
