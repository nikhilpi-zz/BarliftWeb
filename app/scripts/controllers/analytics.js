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
    .controller('AnalyticsCtrl', function($scope, $stateParams, Deals, CloudCode, $http, $modal, Session) {
        $scope.role = Session.userRole;
        // get deals
        Deals.get({
            objectId: $stateParams.selectedDeal,
            include: "feedback"
        }, function(res) {
            $scope.deal = res;
        }).$promise.then(
            function(deal) {
                // get mixpanel data 
                var from_date = moment(deal.deal_start_date).subtract(3, 'days').format("YYYY-MM-DD");
                var to_date = moment(deal.deal_end_date).add(3, 'days').format("YYYY-MM-DD");

                $http.jsonp(generateMixpanelURl(from_date, to_date)).
                success(function(data, status, headers, config) {
                    // console.log(JSON.stringify(data.data.values, null, 2));
                    $scope.mixpanel = data.data.values;

                    createMixpanelGraph();
                }).
                error(function(data, status, headers, config) {
                    console.log("Couldn't get mixpanel data", data, status, config);
                });
            }
        );

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

            modalInstance.result.then(function (feedback) {
              $scope.addAlert({type: 'success', msg: 'Thank you for your feedback!'});
              $scope.deal.feedback = feedback;
            });
        };


        /**
         * alerts - used for dynamic alerts in Notifications and Tooltips view
         */
        $scope.alerts = [];

        $scope.addAlert = function(alert) {
            $scope.alerts.push(alert);
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
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
            createDoughnut($scope);
        });

        var nudges = {};
        $scope.nudgeData = [];

        // get nudge data by day
        CloudCode.call('getNudgesByHour', {
            dealID: $stateParams.selectedDeal
        }).then(function(res) {
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

            // convert to format accepted by flot graph
            angular.forEach(nudges, function(nudge) {
                $scope.nudgeData.push([nudge.utc, nudge.count]);
            });

            // sort nudges by date
            $scope.nudgeData.sort(function(a, b) {
                return a[0] - b[0];
            });


            createNudgeGraph();
        });

        /**
         * Create charts
         */

        // create doughnut chart for gender
        var createDoughnut = function() {
            $scope.doughnutData = [{
                value: $scope.females,
                color: "#a3e1d4",
                highlight: "#1ab394",
                label: "Female"
            }, {
                value: $scope.males,
                color: "#b5b8cf",
                highlight: "#9589a6",
                label: "Male"
            }];
        }

        $scope.graphData = [];

        // create nudge line chart
        var createNudgeGraph = function() {
            // console.log($scope.nudgeData);
            $scope.graphData.push({
                label: "Nudges sent",
                grow: {
                    stepMode: "linear"
                },
                data: $scope.nudgeData,
                color: "#464f88",
                lines: {
                    lineWidth: 1,
                    show: true,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.2
                        }, {
                            opacity: 0.2
                        }]
                    }
                }
            });
        };

        // create mix panel bar graph
        var createMixpanelGraph = function() {
            if ($scope.mixpanel[$stateParams.selectedDeal]) {
                var res = $scope.mixpanel[$stateParams.selectedDeal];
                var data = [];

                angular.forEach(res, function(val, date) {
                    data.push([new Date(date).getTime(), val])
                });

                $scope.graphData.push({
                    label: "Deal detail clicks in the app",
                    grow: {
                        stepMode: "linear"
                    },
                    data: data,
                    color: "#1ab394",
                    yaxis: 2,
                    bars: {
                        show: true,
                        align: "center",
                        barWidth: 24 * 60 * 60 * 600,
                        lineWidth: 0
                    }
                });
            }
        };


        /**
         * Options for chart configurations
         */

        // options for doughnut gender chart
        $scope.doughnutOptions = {
            segmentShowStroke: true,
            segmentStrokeColor: "#fff",
            segmentStrokeWidth: 2,
            percentageInnerCutout: 45, // This is 0 for Pie charts
            animationSteps: 100,
            animationEasing: "easeOutBounce",
            animateRotate: true,
            animateScale: false
        };

        // options for nudge/deal details graph 
        $scope.graphOptions = {
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#d5d5d5",
                borderWidth: 0,
                color: '#d5d5d5'
            },
            colors: ["#1ab394", "#464f88"],
            tooltip: true,
            xaxis: {
                mode: "time",
                tickSize: [3, "day"],
                tickLength: 0,
                axisLabel: "Date",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 10,
                color: "#d5d5d5"
            },
            yaxes: [{
                position: "left",
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 3
            }, {
                position: "right",
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: ' Arial',
                axisLabelPadding: 67
            }],
            legend: {
                noColumns: 1,
                labelBoxBorderColor: "#d5d5d5",
                position: "nw"
            },
        };
    });
