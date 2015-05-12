angular.module('demo', ["googleApi"])
  .config(function(googleLoginProvider) {
    googleLoginProvider.configure({
      clientId: '84345422767-20pm3knvnf2gkio9k3tsn0g3en92bqei.apps.googleusercontent.com',
      scopes: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/plus.login"]
    });
  })
  .controller('DemoCtrl', ['$scope', 'googleLogin', 'googleCalendar', 'googlePlus', function($scope, googleLogin, googleCalendar, googlePlus) {

    $scope.login = function() {
      googleLogin.login().then(function(status) {
        console.log(status);
        return;
      }, function(error) {
        console.log("Error saving object", error);
        return;
      });
    };

    // $scope.$on("googlePlus:loaded", function() {
    //   googlePlus.getCurrentUser().then(function(user) {
    //     $scope.currentUser = user;
    //   });
    // })
    $scope.currentUser = googleLogin.currentUser;

    $scope.loadEvents = function() {
      this.calendarItems = googleCalendar.listEvents({
        calendarId: this.selectedCalendar.id
      });
    }

    $scope.loadCalendars = function() {
      $scope.calendars = googleCalendar.listCalendars();
    }

  }]);
