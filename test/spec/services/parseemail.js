'use strict';

describe('Service: parseEmail', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var parseEmail;
  beforeEach(inject(function (_parseEmail_) {
    parseEmail = _parseEmail_;
  }));

  it('should do something', function () {
    expect(!!parseEmail).toBe(true);
  });

});
