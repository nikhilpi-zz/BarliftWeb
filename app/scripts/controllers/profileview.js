'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:ProfileviewCtrl
 * @description
 * # ProfileviewCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('ProfileviewCtrl', function ($scope, AuthService, User, Venues, $state, Invoice, Session, $modal) {
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

    $scope.startInv = moment().startOf('month');
    $scope.endInv = moment().endOf('month');
    loadInovices();

    $scope.prevMonth = function(){
      $scope.startInv.subtract(1,'months');
      $scope.endInv.subtract(1,'months');
      loadInovices();
    };

    $scope.nextMonth = function(){
      $scope.startInv.add(1,'months');
      $scope.endInv.add(1,'months');
      loadInovices();
    };

    function loadInovices(){
      Invoice.query({
        where:{
          createdAt:
          {
            $gte: $scope.startInv.toDate(),
            $lte: $scope.endInv.toDate()
          }
        }
      }, function(res){
        $scope.invoices = res;
      });
    }

    $scope.getTotal = function(){
      var total = 0;
      angular.forEach($scope.invoices, function(invoice){
        total += invoice.amount;
      });
      return total;
    }

    $scope.updateEmail = function(){
      User.update($scope.user, function(res){
        $scope.$emit('notify', {cssClass: 'alert-success', message:'Your new email has been saved'});
      });
    }

    $scope.openPassword = function () {
      var modalInstance = $modal.open({
        templateUrl: 'views/dash/directives/password-change-modal.html',
        resolve: {
          user: function () {
            return $scope.user;
          }
        },
        controller: function($scope, $modalInstance, user, User){
          $scope.user = user;

          $scope.saveUser = function() {
            User.update($scope.user, function(res){
              $scope.user = null;
              $scope.$emit('notify', {cssClass: 'alert-success', message:'Your new password has been saved'});
              $modalInstance.close();
            });
          }

          $scope.cancel = function () {
            $scope.user.confirmPassword = null;
            $scope.user.password = null;
            $modalInstance.dismiss('cancel');
          };
        }
      });
    };


  });
