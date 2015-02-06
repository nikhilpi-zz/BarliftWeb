'use strict';

describe('Service: Push', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var Push;
  beforeEach(inject(function (_Push_) {
    Push = _Push_;
  }));

  it('should do something', function () {
    expect(!!Push).toBe(true);
  });

});
