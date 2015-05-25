'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:AdminviewCtrl
 * @description
 * # AdminviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('AdminviewCtrl', function ($scope, Deals, Venues, $q, Session, AuthService) {
    var cellEditableTemplate = "<input ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-change=\"updateEntity(row.entity)\"/>";
    $scope.selectedDeal = [];
    $scope.deals = [];
    $scope.role = Session.userRole;
    $scope.ngOptions = { 
      enableRowSelection: true,
      data: 'deals',
      sortInfo: { fields: ['deal_start_date'], directions: ['desc']},
      columnDefs: [
        {field:'deal_start_date', displayName:'Date', cellFilter:'date:"M/d EEE"'},
        {field:'venue_name', displayName:'Bar'},
        {field:'name', displayName:'Name'},
        {field:'community_name', displayName:'Community'},
        {field:'main', displayName:'Deal of the day'},
        {field:'Revenue',displayName:'Est Revenue'},
      ],
      selectedItems: $scope.selectedDeal,
    };

    $scope.updateEntity = function(ent){
      console.log(ent);
    };

    Deals.query({}, function(deals) {
      var allq = [];
      angular.forEach(deals, function(deal){
        if(deal.venue){
          allq.push(Venues.get({objectId: deal.venue},function(venue){
            deal.venue_name = venue.bar_name;
          }).$promise);
        }
      });

      $q.all(allq).then(function(){
        $scope.deals = deals;
      });

    });

    $scope.logout = AuthService.logout;

  });
