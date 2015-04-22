'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:venueBuilder
 * @description
 * # venueBuilder
 */
angular.module('barliftApp')
  .directive('venueBuilder', function (Venues, $http, $stateParams, $filter, $state, Yelp) {
    return {
      templateUrl: 'views/dash/directives/venue-builder.html',
      restrict: 'E',
      scope:{
        user: '=',
        venues: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.$watch('venues', function(){
          if(!$stateParams.selectedVenue){
            scope.venue = Venues.newVenue(scope.user);
          } else {
            var venueFound = $filter('filter')(scope.venues, {objectId: $stateParams.selectedVenue})[0];
            if(!venueFound){
              $state.go('venues.builder', {selectedVenue: undefined});
            } else {
              scope.venue = venueFound;
            }
          }
        });

        scope.loadYelp = function(yelpId){
          yelpId = yelpId.replace('http://', '');
          yelpId = yelpId.replace('www.yelp.com/biz/', '');
          Yelp.getBusiness(yelpId,function(res){
            scope.venue.bar_name = res.name;
            scope.venue.display_phone = res.display_phone;
            scope.venue.image_url = res.image_url;
            scope.venue.address = res.location.display_address[0] + ' '  + res.location.display_address[1];
          });
        };

        function geoCode(address, cb){
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'address': address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              cb(results[0].geometry.location);
            }
          });
        };

        scope.delete = function() {
          Venues.delete(scope.venue,function(res){
            scope.venue = Venues.newVenue(scope.user);
            Venues.query(function(venues) { scope.venues = venues; });
            $state.go('venues.builder', {selectedDeal: undefined});
          });
        };

        scope.save = function(){
          if(scope.locationDetails){
            var geo = scope.locationDetails.geometry.location;
            scope.venue.location = {
              latitude: geo.k,
              longitude: geo.D
            };
            Venues.save(scope.venue,function(res){
              scope.venue = Venues.newVenue(scope.user);
              Venues.query(function(venues) { scope.venues = venues; });
            });
          } else {
            var geo = geoCode(scope.venue.address, function(geo){
              scope.venue.location = {
                latitude: geo.k,
                longitude: geo.D
              };
              Venues.save(scope.venue,function(res){
                scope.venue = Venues.newVenue(scope.user);
                Venues.query(function(venues) { scope.venues = venues; });
              });
            });
          }
        };

      }
    };
  });
