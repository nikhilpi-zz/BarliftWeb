'use strict';

describe('Directive: dealAnalytics', function () {

  // load the directive's module
  beforeEach(module('barliftApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<deal-analytics></deal-analytics>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dealAnalytics directive');
  }));
});
