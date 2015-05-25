'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:AdminviewCtrl
 * @description
 * # AdminviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('AdminviewCtrl', function ($scope,CloudCode, Deals, User, Venues, $q, Session, AuthService, Community) {
    var cellEditableTemplate = "<input ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-change=\"updateEntity(row.entity)\"/>";
    $scope.selectedDeal = [];
    $scope.deals = [];
    $scope.users = [];
    $scope.communities = [];
    $scope.alert = {};
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

    $scope.getDay = function(num){
      return moment().day(num).format('dddd');
    }

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

    User.query({
      where: {
        Role: {
          __type: 'Pointer',
          className: '_Role',
          objectId: 'VyofaLB7t2'
        } 
      }
    }, function(users){
      $scope.users = users;
    })

    $scope.updatePush = function(com){
      console.log(com);
      Community.update(com, function(){
        $scope.$emit('notify', {cssClass: 'alert-success', message:'Push pricing has been saved'});
      })
    }

    $scope.updateSub = function(){
      angular.forEach($scope.users, function(user){
        if(user.sub_price){
          CloudCode.call('updateSub', {userID: user.objectId, sub_price: user.sub_price});
        }
      });

      $scope.$emit('notify', {cssClass: 'alert-success', message:'Subscription pricing has been saved'});
    };

    Community.query({}, function(res){
      $scope.communities = res;
      $scope.selectedCom = $scope.communities[0];
    });

    $scope.logout = AuthService.logout;

  });
