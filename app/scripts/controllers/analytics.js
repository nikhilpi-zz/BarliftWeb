'use strict';

/**
 * @ngdoc function
 * @name barliftWebApp.controller:AnalyticsCtrl
 * @description
 * # AnalyticsCtrl
 * Controller of the barliftWebApp
 */


var generateMixpanelURl = function(from_date, to_date) {
    var expire = (new Date().getTime()) + 1000;

    var sig_param = "api_key=9f892f20a7ddce5c46c49bccb9af0c9aevent=Deal Click to Detailexpire=" + expire + "format=jsonfrom_date=" + from_date + 'on=properties["DealID"]to_date=' + to_date + '82da5c883b1e6cb18800ee74553f8665';
    var sig = $.md5(sig_param);

    var url = "http://mixpanel.com/api/2.0/segmentation/?" +
        "on=properties%5B%22DealID%22%5D&" +
        "format=json&" +
        "from_date=" + from_date + "&" +
        "expire=" + expire + "&" +
        "sig=" + sig + "&" +
        "to_date=" + to_date + "&" +
        "api_key=9f892f20a7ddce5c46c49bccb9af0c9a&" +
        "event=Deal+Click+to+Detail" +
        "&callback=JSON_CALLBACK";

    return url;
}

angular.module('barliftApp')
    .controller('AnalyticsCtrl', function($scope, $stateParams, Deals, CloudCode, $http, $modal, Feedback) {

        // get deals
        Deals.get({
            objectId: $stateParams.selectedDeal,
            include: "feedback",
            include: "venue"
        }, function(res) {
            $scope.deal = res;
            // console.log(JSON.stringify(res.feedback, null, 2));
        });

        // feedback modal
        $scope.openFeedback = function() {
            var modalInstance = $modal.open({
                templateUrl: 'views/dash/deals.feedback.html',
                controller: 'FeedbackCtrl',
                resolve: {
                    dealID: function() {
                        return $stateParams.selectedDeal;
                    }
                }
            });

            modalInstance.result.then(function(feedback) {
                $scope.deal.feedback = feedback;
                $scope.$emit('notify', {
                    cssClass: 'alert-success',
                    message: 'Thank you for your feedback'
                });
            });
        };


        /**
         * Get data for charts
         */

        // get gender and create doughnut chart
        CloudCode.call('dealAnalytics', {
            dealId: $stateParams.selectedDeal
        }).then(function(res) {
            $scope.males = res.result.gender.male;
            $scope.females = res.result.gender.female;

            // create chart
            $scope.genderData = [$scope.females, $scope.males];
            $scope.genderLabels = ["Females", "Males"];
        });


        var getDatesInRange = function(start, end) {
            var dates = [];
            var current = new Date(start);
            while (current <= end) {
                current.setHours(0, 0, 0, 0);
                dates.push(new Date(current))
                current.setDate(current.getDate() + 1);
            }
            return dates;
        };

        // get nudge data by day
        CloudCode.call('getNudgesByHour', {
            dealID: $stateParams.selectedDeal
        }).then(function(res) {
            var nudges = {};

            $scope.dates = getDatesInRange($scope.deal["createdAt"], $scope.deal["deal_end_date"]);

            angular.forEach(res.result, function(nudge) {
                var date = new Date(nudge["createdAt"]);
                var temp = new Date(date);
                temp.setHours(0, 0, 0, 0);

                // if date exists increment count, otherwise create new
                if (nudges[temp]) {
                    nudges[temp].count += 1;
                } else {
                    nudges[temp] = {
                        utc: date.getTime(),
                        count: 1
                    }
                }
            });

            // convert to format accepted by graph
            var nudgeData = [],
                dates = [];
            angular.forEach($scope.dates, function(date) {
                dates.push(moment(date).format("MMM DD"));
                if (nudges[date]) {
                    nudgeData.push(nudges[date]["count"]);
                } else {
                    nudgeData.push(0);
                }
            });

            $scope.labels = dates;
            $scope.series = ["Nudges sent", "Deal Clicks"];

            return nudgeData;

        }).then(function(nudgeData) {

            // get mixpanel data 
            var from_date = moment($scope.deal.createdAt).format("YYYY-MM-DD");
            var to_date = moment($scope.deal.deal_end_date).format("YYYY-MM-DD");

            $http.jsonp(generateMixpanelURl(from_date, to_date)).
            success(function(data, status, headers, config) {
                // console.log(JSON.stringify(data.data.values, null, 2));
                $scope.mixpanel = data.data.values;
                createMixpanelGraph(nudgeData);
            }).
            error(function(data, status, headers, config) {
                console.log("Couldn't get mixpanel data", data, status, config);
            });

        });

        /**
         * Create charts
         */


        // create mix panel bar graph
        var createMixpanelGraph = function(nudgeData) {
            if ($scope.mixpanel[$stateParams.selectedDeal]) {
                var res = $scope.mixpanel[$stateParams.selectedDeal];
                var detailsData = [];

                angular.forEach($scope.dates, function(date) {
                    var date = moment(date).format("YYYY-MM-DD")
                    if (res[date]) {
                        detailsData.push(res[date]);
                    } else {
                        detailsData.push(0);
                    }
                });

                $scope.data = [nudgeData, detailsData];
            } else {
                $scope.data = [nudgeData];
            }
        };


    });
