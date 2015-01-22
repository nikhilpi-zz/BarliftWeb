'use strict';

/**
 * @ngdoc service
 * @name barliftApp.User
 * @description
 * # User
 * Factory in the barliftApp.
 */
angular.module('barliftApp')
  .factory('User', function () {
    var currentUser;

    var User = {
      name: 'User',

      // Login a user
      login : function login(username, password, callback) {
        Parse.User.logIn(username, password, {
          success: function(user) {
            currentUser = user;
            callback(user);
          },
          error: function(user, error) {
            alert('Error: ' + error.message);
          }
        });
      },

      // // Login a user using Facebook
      // FB_login : function FB_login(callback) {
      //   Parse.FacebookUtils.logIn(null, {
      //     success: function(user) {
      //       if (!user.existed()) {
      //         alert("User signed up and logged in through Facebook!");
      //       } else {
      //         alert("User logged in through Facebook!");
      //       }
      //       $rootScope.loggedInUser = user;
      //       callback(user);
      //     },
      //     error: function(user, error) {
      //       alert("User cancelled the Facebook login or did not fully authorize.");
      //     }
      //   });
      // },

      // // Register a user
      // signUp : function signUp(username, password, callback) {
      //   Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
      //       success: function(user) {
      //           loggedInUser = user;
      //           callback(user);
      //       },

      //       error: function(user, error) {
      //         alert("Error: " + error.message);
      //       }
      //   });
      // },

      // Logout current user
      logout : function logout(callback) {
        Parse.User.logOut();
        currentUser = null;
      },

      // Get current logged in user
      getUser : function getUser() {
        if(currentUser || Parse.User.current()) {
          currentUser = Parse.User.current();
          return Parse.User.current();
        }
      },

      isLoggedIn : function isLoggedIn() {
        if(currentUser || Parse.User.current()) {
          return true;
        } else {
          return false;
        }
      },

      checkUserRole : function checkUserRole(roleName, cb){
        var query = (new Parse.Query(Parse.Role));
        query.equalTo("name", roleName);
        query.equalTo("users", Parse.User.current());
        query.first({
          success: function(result){
            if(result){
              cb(true);
            } else {
              cb(false);
            }
          }
        });
      },

      getUserRole : function checkUserRole(cb){
        var queryRoles = new Parse.Query('_Role');
        queryRoles.find({
          success: function(roles) {
            for(var i = 0; i < roles.length; i++) {
              var queryUser = (new Parse.Query(Parse.Role));
              queryUser.equalTo("objectId", roles[i].id);
              queryUser.equalTo("users", Parse.User.current());
              queryUser.first({
                success: function(result){
                  if(result){
                    cb(result.get('name'));
                  }
                }
              });
            }
          },

          error: function(error) {
            
          }
        });
      },
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return User;
  });
