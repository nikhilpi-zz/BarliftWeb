'use strict';

/**
 * @ngdoc function
 * @name barliftApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the barliftApp
 */
angular.module('barliftApp')
  .controller('DashboardCtrl', function($scope, AuthService, User, Deals, CloudCode, $http, googleCalendar, $ocLazyLoad) {
    $scope.logout = AuthService.logout;
    $scope.user = {};

    User.getCurrent(function(res) {
      $scope.user = res;

      Deals.query({}, function(allDeals) {
        Deals.query({
            where: {
              user: $scope.user.getPointer()
            }
          },
          function(barDeals) {
            $scope.allDeals = allDeals;

            if (res.username == "admin") {
              main(allDeals);
            } else {
              main(barDeals);
            }
          });
      });

    });

    // get weather
    $http.jsonp('http://api.wunderground.com/api/f2a7d6ad5a260a8a/forecast10day/q/IL/Evanston.json?callback=JSON_CALLBACK').
    success(function(data, status, headers, config) {
      $scope.weather = data.forecast.simpleforecast.forecastday;
    }).
    error(function(data, status, headers, config) {
      console.log("Couldn't get weather", data);
    });

    var nextWeekDeals = function() {
      $scope.upcomingDealsEvents = [];
      $scope.numUpcomingDeals = 0;

      // make past deals obj
      var today = new Date;
      today.setHours(0, 0, 0, 0);
      var myDate = new Date();

      for (var i = 0; i < 7; i++) {
        var nextDay = new Date();
        myDate.setHours(0, 0, 0, 0);

        var obj = {
          date: myDate,
          deals: [],
          events: []
        };
        $scope.upcomingDealsEvents[i] = obj;

        nextDay.setDate(myDate.getDate() + 1);
        myDate = nextDay;
      }

      // add upcoming deals to obj
      angular.forEach($scope.deals, function(deal) {
        var date = deal["deal_start_date"];

        var dateIndex = Math.floor((date - today) / (1000 * 60 * 60 * 24));

        if (dateIndex >= 0 && dateIndex < 7) {
          $scope.upcomingDealsEvents[dateIndex].deals.push(deal);
          $scope.numUpcomingDeals += 1;
        };
      });
    }

    var nextWeekEvents = function() {
      $scope.numUpcomingEvents = 0;
      var today = new Date;
      today.setHours(0, 0, 0, 0);

      // add events to obj
      angular.forEach($scope.events, function(event) {
        if (event.start.date) {
          var date = new Date(event.start.date);
        } else {
          var date = new Date(event.start.dateTime);
        }
        var temp = new Date(date);
        temp.setHours(0, 0, 0, 0);
        var dateIndex = Math.floor((temp - today) / (1000 * 60 * 60 * 24));

        // console.log(event.summary, event.start.date, dateIndex);

        if (dateIndex >= 0 && dateIndex < 7) {
          $scope.upcomingDealsEvents[dateIndex].events.push(event);
          $scope.numUpcomingEvents += 1;
        };
      });
    }

    var dealsInLastRange = function(deals, start, end) {
      var num_days = end - start + 1;
      var data = new Array(num_days);

      angular.forEach(deals, function(deal) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var date = new Date(deal["deal_start_date"]);
        date.setHours(0, 0, 0, 0);

        var dateDiff = Math.floor((today - date) / (1000 * 60 * 60 * 24));

        if (start <= dateDiff && dateDiff <= end) {
          var dateIndex = end - dateDiff;
          if (data[dateIndex]) {
            data[dateIndex].push(deal);
          } else {
            data[dateIndex] = [deal];
          }
        };
      });
      return data;
    }

    var daysLastWeek = function() {
      var d = new Date();
      var day = d.getDay() + 1;
      var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      var lastWeek = [];
      for (var i = 0; i < 7; i++) {
        if (day > 6) day = 0;
        lastWeek.push(weekday[day]);
        day += 1;
      }

      return lastWeek;
    }

    var interestedInRange = function(start, end) {
      var dealList = dealsInLastRange($scope.deals, start, end);
      var data = Array.apply(null, new Array(dealList.length)).map(Number.prototype.valueOf, 0);

      for (var i = 0; i < dealList.length; i++) {
        angular.forEach(dealList[i], function(deal) {
          data[i] += deal.num_accepted;
        });
      };

      return data;
    }

    var revenueInRange = function(start, end) {
      var dealList = dealsInLastRange($scope.deals, start, end);
      var revenue = 0;

      for (var i = 0; i < dealList.length; i++) {
        angular.forEach(dealList[i], function(deal) {
          if (deal.revenue) {
            revenue += deal.revenue;
          }
        });
      };

      return revenue;
    }


    var mostPopularDeal = function() {
      var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var dealList = dealsInLastRange($scope.allDeals, 0, 6);
      var dealName, day;
      var maxSeenSoFar = 0;

      for (var i = 0; i < dealList.length; i++) {
        angular.forEach(dealList[i], function(deal) {
          if (deal.num_accepted > maxSeenSoFar) {
            dealName = deal.name;
            day = deal.deal_start_date
            maxSeenSoFar = deal.num_accepted;
          }
        });
      };

      return {
        dealName: dealName,
        day: weekday[day.getDay()],
        interested: maxSeenSoFar
      };
    }

    var main = function(deals) {
      $scope.deals = deals;

      // list of deals next week
      nextWeekDeals();

      // list of days last week e.g. Mon, Tues 
      $scope.lastWeekDays = daysLastWeek();

      // list of deals last week
      $scope.dealsLastWeek = dealsInLastRange($scope.deals, 0, 6);

      // list of people interested last week (oldest first)
      $scope.interestedLastWeek = interestedInRange(0, 6);

      // list of people interested 2 weeks back (oldest first)
      $scope.interestedTwoWeeksBack = interestedInRange(7, 13);

      // num interested
      var sum = 0;
      for (var i = 0; i < $scope.interestedLastWeek.length; i++) {
        sum += $scope.interestedLastWeek[i];
      }
      $scope.numInterestedLastWeek = sum;

      var sum = 0;
      for (var i = 0; i < $scope.interestedTwoWeeksBack.length; i++) {
        sum += $scope.interestedTwoWeeksBack[i];
      }
      $scope.numInterestedTwoWeeksBack = sum;

      // % increase in interested
      if ($scope.numInterestedTwoWeeksBack == 0) {
        $scope.interestedIncreaseAbs = 0;
      } else {
        $scope.interestedIncrease = 100 * ($scope.numInterestedLastWeek - $scope.numInterestedTwoWeeksBack) / $scope.numInterestedTwoWeeksBack;
        $scope.interestedIncreaseAbs = Math.abs($scope.interestedIncrease);
      }
      

      // most popular deal name and day
      var data = mostPopularDeal();
      $scope.mostPopularDealName = data.dealName;
      $scope.mostPopularDealDay = data.day;

      // revenue last week
      $scope.revenue = revenueInRange(0, 6);

      // line chart
      $scope.lineData = [$scope.interestedLastWeek, $scope.interestedTwoWeeksBack];
      $scope.lineLabels = $scope.lastWeekDays;
      $scope.lineSeries = ["Last week", "Two weeks back"];  

      // get events
      var eventsPromise = googleCalendar.getEvents({
        //'calendarId': 'qq86rub5anh0ikbdnav9vtlqfou6i38v@import.calendar.google.com',
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'singleEvents': true,
        'maxResults': 20,
        'orderBy': 'startTime'
      });

      // handle events
      eventsPromise.then(function(events) {
        $scope.events = events;
        nextWeekEvents();
      }, function(err) {
        console.log("Error loading events", err);
      });

    }
  });
