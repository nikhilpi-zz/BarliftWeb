'use strict';

/**
 * @ngdoc service
 * @name barliftApp.Yelp
 * @description
 * # Yelp
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('Yelp', function ($http) {
    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    };

    return {
      getBusiness: function (yelpID) {
        var method = 'GET';
        var url = 'http://api.yelp.com/v2/business/' + yelpID;
        var params = {
                callback: 'angular.callbacks._0',
                oauth_consumer_key: 'Zm9xJcBs-wTA2xgNsYwUHQ', //Consumer Key
                oauth_token: 'KLi_UOL1kXiRjL46U7MaMFasADLeMS24', //Token
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
            };
        var consumerSecret = 'dIbUA7qGcUovMxYz0Y9fYevD1dw'; //Consumer Secret
        var tokenSecret = 'l7iJTLAp73HHm5_R8ac2LzNX7po'; //Token Secret
        var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, { encodeSignature: false});
        params['oauth_signature'] = signature;
        return $http.jsonp(url, {params: params});
      }
    };
  });
