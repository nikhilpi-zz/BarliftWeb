'use strict';

describe('Controller: PromoteviewCtrl', function () {

  // load the controller's module
  beforeEach(module('barliftApp'));

  var PromoteviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PromoteviewCtrl = $controller('PromoteviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
