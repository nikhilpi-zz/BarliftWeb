'use strict';

/**
 * @ngdoc service
 * @name barliftApp.googleCalendar
 * @description
 * # googleCalendar
 * Service in the barliftApp.
 */
angular.module('barliftApp')
    .service('googleCalendar', function($q) {
        var googleCalendar = {};

        // Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        var CLIENT_ID = '1075855110201-bcja8cjst56v479kls73o888ktgg730j.apps.googleusercontent.com';

        // This quickstart only requires read-only scope, check
        // https://developers.google.com/google-apps/calendar/auth if you want to
        // request write scope.
        var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

        // Initiate auth flow in response to user clicking authorize button.

        googleCalendar.getEvents = function(params) {
            googleCalendar.deferred = $q.defer();

            googleCalendar.params = params;
            gapi.auth.authorize({
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': true
                },
                handleAuthResult);


            return googleCalendar.deferred.promise;
        };

        function handleAuthResult(authResult) {
            if (authResult && !authResult.error) {
                googleCalendar.loadCalendarApi();
            } else {
                // Show auth UI, allowing the user to initiate authorization by
                // clicking authorize button.
                gapi.auth.authorize({
                        'client_id': CLIENT_ID,
                        'scope': SCOPES,
                        'immediate': false
                    },
                    googleCalendar.loadCalendarApi());
            }
        };

        /**
         * Load Google Calendar client library. List upcoming events
         * once client library is loaded.
         */
        googleCalendar.loadCalendarApi = function() {
            gapi.client.load('calendar', 'v3', googleCalendar.listUpcomingEvents);
        }

        /**
         * Print the summary and start datetime/date of the next ten events in
         * the authorized user's calendar. If no events are found an
         * appropriate message is printed.
         */
        googleCalendar.listUpcomingEvents = function() {
            var request = gapi.client.calendar.events.list(googleCalendar.params);

            request.execute(function(resp) {
                var events = resp.items;
                // console.log(JSON.stringify(events, null, 2));
                googleCalendar.deferred.resolve(events);
            });
        }

        return googleCalendar;
    });
