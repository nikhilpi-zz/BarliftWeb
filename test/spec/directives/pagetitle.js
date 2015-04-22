'use strict';

describe('Directive: pageTitle', function () {

  // load the directive's module
  beforeEach(module('barliftApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<page-title></page-title>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pageTitle directive');
  }));
});
