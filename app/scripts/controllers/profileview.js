'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:ProfileviewCtrl
 * @description
 * # ProfileviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('ProfileviewCtrl', function ($scope, AuthService, User, Venues, $state, CloudCode, Session) {
    $scope.logout = AuthService.logout;
    $scope.user = {};
    $scope.selectedVenue = Venues.newVenue($scope.user);
    $scope.alert = null;
    $scope.invoices = [];
    $scope.role = Session.userRole;
    $scope.payments = {
      plans: [
      {
        name: 'Basic', 
        cost: 30, 
        details: 'Unlimited Deals per month, Pay per push.',
        id: 'basic_plan'
      }]
    };

    User.getCurrent(function(res){ 
      $scope.user = res; 
    });

    $scope.processCard = function(status, response){
      if(response.error) {
        $scope.alert = response.error.message || response.error;
      } else {
        $scope.token = response.id;
        $scope.alert = null;
        $state.go('profile.payment.three_review');
      }
    };

    $scope.createSub = function(){
      CloudCode.call('subscribe',{
        token: $scope.token,
        plan: $scope.payments.plans[$scope.payments.subPlan].id,
        name: $scope.payments.name
      }, function(res) {
        $state.go('profile.invoice');
      });
    };

    CloudCode.call('getUpComingInvoice',{}).then(function(res){
      $scope.invoices = res.result.data;
    });

    $scope.updateUser = function(){
      User.update($scope.user).$promise.then(function(sucess){
        $scope.alert = null;
        $scope.$emit('notify', {cssClass: 'alert-success', message:'Your account has been updated'});
        $state.go('dash.main')
      },
      function(err){
        $scope.alert = {text: err.data.error};
      })
    }


  });
