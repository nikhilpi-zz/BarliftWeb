'use strict';

/**
 * @ngdoc directive
 * @name barliftApp.directive:venueBuilder
 * @description
 * # venueBuilder
 */
angular.module('barliftApp')
  .directive('venueBuilder', function (Venues, User, Yelp, $rootScope) {
    return {
      templateUrl: 'views/dash/directives/venue-builder.html',
      restrict: 'E',
      scope:{
      },
      link: function postLink(scope, element, attrs) {
        scope.user = {};
        scope.venues = [];
        scope.venue = Venues.newVenue(scope.user);

        User.getCurrent(function(res){ 
          scope.user = res; 
          loadDeals();          
        });

        function loadDeals(){
          Venues.query({
            where: {
              manager: scope.user.getPointer()
            }
          },function(venues) { scope.venues = venues; });
        }

        scope.editVenue = function(deal){
          scope.venue = deal;
        };

        scope.deleteVenue = function(deal) {
          Venues.delete(deal,function(res){
            loadDeals();
            scope.venue = Venues.newVenue(scope.user);
          });
        };

        scope.loadYelp = function(){
          var id = scope.venue.yelpId.replace('http://', '');
          id = id.replace('www.yelp.com/biz/', '');
          Yelp.getBusiness(id).success(function(res){
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
            loadDeals();
            scope.venue = Venues.newVenue(scope.user);
          });
        };

        scope.cancel = function() {
          loadDeals();
          scope.venue = Venues.newVenue(scope.user);
        };

        scope.save = function(){
          if(scope.locationDetails){
            var geo = scope.locationDetails.geometry.location;
            scope.venue.location = {
              latitude: geo.A,
              longitude: geo.F
            };
            Venues.save(scope.venue,function(res){
              loadDeals();
              scope.venue = Venues.newVenue(scope.user);
            });
          } else {
            var geo = geoCode(scope.venue.address, function(geo){
              scope.venue.location = {
                latitude: geo.A,
                longitude: geo.F
              };
              Venues.save(scope.venue,function(res){
                loadDeals();
                scope.venue = Venues.newVenue(scope.user);
              });
            });
          }
        };

        scope.update = function(){
          if(scope.locationDetails){
            var geo = scope.locationDetails.geometry.location;
            scope.venue.location = {
              latitude: geo.A,
              longitude: geo.F
            };
            Venues.update(scope.venue,function(res){
              loadDeals();
              scope.venue = Venues.newVenue(scope.user);
            });
          } else {
            var geo = geoCode(scope.venue.address, function(geo){
              scope.venue.location = {
                latitude: geo.A,
                longitude: geo.F
              };
              Venues.update(scope.venue,function(res){
                loadDeals();
                scope.venue = Venues.newVenue(scope.user);
              });
            });
          }
        };

      }
    };
  });
