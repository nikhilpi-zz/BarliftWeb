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
      resProcess: function(obj){
        var keys = Object.keys(obj);
        obj.schema = [];
        for(var i = 0; i < keys.length; i++){
          if(obj[keys[i]].__type){
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
              default:
                break;
            }
          }
        }
        return obj;
      },

      reqProcess: function(obj){
        var schema = obj.schema;
        for(var i = 0; i < schema.length; i++){
          var type = schema[i].__type;
          var currentVal = obj[schema[i].key];
          switch(type){
            case "Pointer":
              console.log(obj[schema[i].key]);
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
            default:
              break;
          }
        }
        delete obj['schema'];
        return obj;
      }
    };
  });
