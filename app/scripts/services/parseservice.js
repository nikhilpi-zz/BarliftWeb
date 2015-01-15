'use strict';

/**
 * @ngdoc service
 * @name barliftApp.ParseService
 * @description
 * # ParseService
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('ParseService', function () {
    // Service logic
    // ...
    Parse.initialize('5DZi1FrdZcwBKXIxMplWsqYu3cEEumlmFDB1kKnC','G7yhVdBRY3S2jvjkHKddlsES5YZu1z99Nh9JPLTN');

    var loggedInUser;
    var Email = Parse.Object.extend("email");

    var ParseService = {
      name: "Parse",

      // Login a user
      login : function login(username, password, callback) {
        Parse.User.logIn(username, password, {
          success: function(user) {
            loggedInUser = user;
            callback(user);
          },
          error: function(user, error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Login a user using Facebook
      FB_login : function FB_login(callback) {
        Parse.FacebookUtils.logIn(null, {
          success: function(user) {
            if (!user.existed()) {
              alert("User signed up and logged in through Facebook!");
            } else {
              alert("User logged in through Facebook!");
            }
            loggedInUser = user;
            callback(user);
          },
          error: function(user, error) {
            alert("User cancelled the Facebook login or did not fully authorize.");
          }
        });
      },

      // Register a user
      signUp : function signUp(username, password, callback) {
        Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
            success: function(user) {
                loggedInUser = user;
                callback(user);
            },

            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      },

      // Logout current user
      logout : function logout(callback) {
        Parse.User.logOut();
      },

      // Get all public books
      getEmails : function getBooks(callback) {
        // Create a new Parse Query to search Book records by visibility
        var query = new Parse.Query(Email);
        query.find({
          success : function(results) {
            callback(results);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Create a new book record
      addEmail : function addEmail(_email, callback) {
        var object = new Email();
        object.save({email:_email}, {
          success: function(object) {
            callback(object);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Get current logged in user
      getUser : function getUser() {
        if(loggedInUser) {
          return loggedInUser;
        }
      },

      isLoggedIn : function isLoggedIn() {
        if(loggedInUser) {
          return true;
        } else {
          return false;
        }
      }
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
  });
