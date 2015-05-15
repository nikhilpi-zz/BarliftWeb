'use strict';

describe('Controller: ProfileviewCtrl', function () {

  // load the controller's module
  beforeEach(module('barliftApp'));

  var ProfileviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileviewCtrl = $controller('ProfileviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
