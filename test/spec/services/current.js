'use strict';

describe('Service: Current', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var Current;
  beforeEach(inject(function (_Current_) {
    Current = _Current_;
  }));

  it('should do something', function () {
    expect(!!Current).toBe(true);
  });

});
