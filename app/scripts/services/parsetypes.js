'use strict';

/**
 * @ngdoc service
 * @name barliftApp.ParseTypes
 * @description
 * # ParseTypes
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('ParseTypes', function () {
    //Takes in json objects, converts to parse api types

    return {
      resProcess: function(obj, objClass){
        var keys = Object.keys(obj);
        obj.schema = [];
        for(var i = 0; i < keys.length; i++){
          if(obj[keys[i]] && obj[keys[i]].__type){
            var type = obj[keys[i]].__type;
            switch(type){
              case "Pointer":
                obj.schema.push({
                  key: keys[i], 
                  __type: obj[keys[i]].__type, 
                  className: obj[keys[i]].className
                });
                obj[keys[i]] = obj[keys[i]].objectId;
                break;
              case "Date":
                obj.schema.push({
                  key: keys[i], 
                  __type: obj[keys[i]].__type
                });
                obj[keys[i]] = new Date(obj[keys[i]].iso);
                break;
              case "GeoPoint":
                obj.schema.push({
                  key: keys[i], 
                  __type: obj[keys[i]].__type
                });
                obj[keys[i]] = {
                  latitude: obj[keys[i]].latitude,
                  longitude: obj[keys[i]].longitude
                };
                break;
              default:
                break;
            }
          }
        }

        obj.getPointer = function(){
          return {
            objectId: obj.objectId,
            __type: 'Pointer', 
            className: objClass
          };
        };
        return obj;
      },

      reqProcess: function(inObj){
        var obj = angular.copy(inObj);
        var schema = obj.schema;
        if (schema){
          for(var i = 0; i < schema.length; i++){
            var type = schema[i].__type;
            var currentVal = obj[schema[i].key];
            switch(type){
              case "Pointer":
                var pointer = {
                  objectId: currentVal,
                  __type: schema[i].__type, 
                  className: schema[i].className
                };
                obj[schema[i].key] = pointer;
                break;
              case "Date":
                var date = {
                  iso: currentVal,
                  __type: schema[i].__type
                };
                obj[schema[i].key] = date;
                break;
              case "GeoPoint":
                var geo = {
                  __type: schema[i].__type,
                  latitude: currentVal.latitude,
                  longitude: currentVal.longitude
                };
                obj[schema[i].key] = geo;
                break;
              default:
                break;
            }
          }
          delete obj['schema'];
        }
        delete obj['getPointer'];
        return obj;
      }
    };
  });
