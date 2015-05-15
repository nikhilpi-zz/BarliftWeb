'use strict';

describe('Controller: BarFeedbackCtrl', function () {

  // load the controller's module
  beforeEach(module('barliftApp'));

  var BarFeedbackCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BarFeedbackCtrl = $controller('BarFeedbackCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
