'use strict';

describe('Service: CloudCode', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var CloudCode;
  beforeEach(inject(function (_CloudCode_) {
    CloudCode = _CloudCode_;
  }));

  it('should do something', function () {
    expect(!!CloudCode).toBe(true);
  });

});
