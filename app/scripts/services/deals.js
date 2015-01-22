'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Deals
 * @description
 * # Deals
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Deals', function () {
    // Service logic
    // ...
    var Deal = Parse.Object.extend("Deal");
    var dealQuery = new Parse.Query(Deal);

    var Deals = {
      name: 'Deals',

      getUserDeals : function getUserDeals(user, callback){
        dealQuery.equalTo('user', user.get('objectId'));
        dealQuery.find({ 
          success: function(results){
            callback(results);
          }
        });
      }
    };

    return Deals;
  });
