'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('barliftApp'));

  var AdminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, User, ParseService) {
    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
  }));

  // it('should emails to the scope', function () {
  //   expect(scope.emails.length).not.to.equal(0);
  // });
});
