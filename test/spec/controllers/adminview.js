'use strict';

describe('Controller: AdminviewCtrl', function () {

  // load the controller's module
  beforeEach(module('barliftApp'));

  var AdminviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminviewCtrl = $controller('AdminviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
