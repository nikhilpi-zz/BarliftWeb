'use strict';

describe('Directive: userForm', function () {

  // load the directive's module
  beforeEach(module('barliftApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-form></user-form>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the userForm directive');
  }));
});
