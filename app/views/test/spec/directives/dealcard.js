'use strict';

describe('Directive: dealcard', function () {

  // load the directive's module
  beforeEach(module('viewsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dealcard></dealcard>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dealcard directive');
  }));
});
