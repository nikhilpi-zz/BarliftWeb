'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:venueBuilder
 * @description
 * # venueBuilder
 */
angular.module('barliftApp')
  .directive('venueBuilder', function (Venues, Yelp, $rootScope) {
    return {
      templateUrl: 'views/dash/directives/venue-builder.html',
      restrict: 'E',
      scope:{
        user: '=',
        venues: '=',
        venue: '='
      },
      link: function postLink(scope, element, attrs) {

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
            $rootScope.$broadcast('venues-update');
          });
        };

        scope.cancel = function() {
          $rootScope.$broadcast('venues-update');
        };

        scope.save = function(){
          if(scope.locationDetails){
            var geo = scope.locationDetails.geometry.location;
            scope.venue.location = {
              latitude: geo.A,
              longitude: geo.F
            };
            Venues.save(scope.venue,function(res){
              $rootScope.$broadcast('venues-update');
            });
          } else {
            var geo = geoCode(scope.venue.address, function(geo){
              scope.venue.location = {
                latitude: geo.A,
                longitude: geo.F
              };
              Venues.save(scope.venue,function(res){
                $rootScope.$broadcast('venues-update');
              });
            });
          }
        };

      }
    };
  });
