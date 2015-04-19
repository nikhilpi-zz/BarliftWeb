'use strict';

describe('Service: Venue', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var Venue;
  beforeEach(inject(function (_Venue_) {
    Venue = _Venue_;
  }));

  it('should do something', function () {
    expect(!!Venue).toBe(true);
  });

});
