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

    var deals = [];

    function listToJSON(lst){
      var out = []
      for (var i = 0; i < lst.length;i++) {
        out.push(lst[i].toJSON());
      }
      return out;
    }

    function jsonToParseDeal(deal){
      for (parseDeal in deals){
        if (deal.objectId === parseDeal.id){
          return parseDeal;
        }
      }
    }
    

    var Deals = {
      name: 'Deals',

      getUserDeals : function getUserDeals(user, callback){
        dealQuery.equalTo('user', user.get('objectId'));
        dealQuery.find({ 
          success: function(results){
            deals = results;
            callback(listToJSON(results));
          }
        });
      },

      saveDeal : function saveDeal(user, deal){
        var parseDeal = jsonToParseDeal(deal);
        for (key in Object.keys(deal)){
          console.log(deal[key]);
          console.log(parseDeal.get(key);
        }
      }
    };

    return Deals;
  });
