'use strict';

describe('Service: Emails', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var emails;
  beforeEach(inject(function (_Emails_) {
    emails = _emails_;
  }));

  it('should do something', function () {
    expect(!!emails).toBe(true);
  });

});
