'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:dealForm
 * @description
 * # dealForm
 */
angular.module('barliftApp')
  .directive('dealForm', ['ParseTypes', 'Deals', function (ParseTypes, Deals) {
    return {
      templateUrl: 'views/dealform.html',
      restrict: 'E',
      scope: {
        deal: '=',
        user: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.isNew = true;
        console.log(scope.user);
        //Convert parse date to js date
        scope.$watch('deal', function(newVal, oldVal){
          if(scope.deal.objectId){
            scope.isNew = false;
          } else {
            scope.isNew = true;
          }
        });

        //convert date back to parse date. Update or save depending on object
        scope.saveDeal = function(deal){
          if (deal.objectId){
            Deals(scope.user).update(deal, function(res){
              scope.deal = Deals(scope.user).newDeal();
            })
          } else {
            Deals(scope.user).save(deal, function(res){
              scope.deal.objectId = res.objectId;
              scope.deal = Deals(scope.user).newDeal();
            })
          } 
        };

      }
    };
  }]);
