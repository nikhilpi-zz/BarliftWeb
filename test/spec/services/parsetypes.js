'use strict';

describe('Service: ParseTypes', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var ParseTypes;
  beforeEach(inject(function (_ParseTypes_) {
    ParseTypes = _ParseTypes_;
  }));

  it('should do something', function () {
    expect(!!ParseTypes).toBe(true);
  });

});
