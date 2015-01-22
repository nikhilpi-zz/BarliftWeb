'use strict';

describe('Controller: BarCtrl', function () {

  // load the controller's module
  beforeEach(module('barliftApp'));

  var BarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BarCtrl = $controller('BarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
