'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:analytics
 * @description
 * # analytics
 */
angular.module('barliftApp')
  .directive('analytics', function (User) {
    return {
      templateUrl: 'views/analytics.html',
      restrict: 'E',
      scope: {
        deals: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.selected = scope.deals[scope.deals.length-1];

        // bar chart helper funtions
        //var format = d3.format('.0%');
        var format = d3.format('.0f');
        scope.valueFormatFunction = function() {
          return function (d) {
            return format(d);
          }
        };

        // pie chart helper functions
        scope.xFunction = function(){
          return function(d) {
            return d.name;
          };
        };

        scope.yFunction = function(){
          return function(d) {
            return d.value;
          };
        };

        // reset scope variables
        var resetVals = function(res) {
          scope.numPrepay = 0;
          scope.numNightOuts = 0;
          scope.numNudges = 0;
          scope.numDealsRedeemed = 0;
          scope.totalUsers = res.length;
          scope.groupsArr = [];
        };

        // param to get users related to deals
        var getParams = function() {
          return {
            "keys": "deals_redeemed,dm_team,num_nights,pay_interest,profile,times_nudged",
            "where": {
              "$relatedTo": {
                "object": {
                  "__type": "Pointer",
                  "className": "Deal",
                  "objectId": scope.selected.objectId
                },
                "key": "social"
              }
            }
          };
        };

        // update geneder data to be used by nvd3 bar chart
        var updateGenderArr = function(males, females) {
          scope.genderArr = [
            {
              key: "Gender",
              values: [
                ["Male",  males],
                ["Female" , females]
              ]
            }
          ];
        };

        // update groups to be used by nvd3 pie chart
        var updateGroups = function(groups) {
          angular.forEach(groups, function(value, name) {
            if(name=='Choose a team...') scope.groupsArr.push({name: 'Others', value: value})
            else if (name && value>1) scope.groupsArr.push({name: name, value: value});
          });
        };

        scope.updateStats = function() {

          User.query(getParams(), function(res) {
            resetVals(res);

            var males = 0;
            var females = 0;
            var groups = {};

            angular.forEach(res, function(user) {
              // get basic numerical stats
              if (user.pay_interest) scope.numPrepay ++;
              if (parseInt(user.num_nights)) scope.numNightOuts += parseInt(user.num_nights);
              if (parseInt(user.times_nudged)) scope.numNudges += parseInt(user.times_nudged);
              if (parseInt(user.deals_redeemed)) scope.numDealsRedeemed += parseInt(user.deals_redeemed);

              // get gender
              if (user.profile.gender) {
                if (user.profile.gender=='male') males++;
                else if (user.profile.gender=='female') females++;
              };

              // get groups
              var group = user.dm_team;
              (group in groups)? groups[group]++ : groups[group] = 1
            });

            updateGroups(groups);
            updateGenderArr(males, females);

          });
        };

        scope.updateStats();

      }
    };
  });
