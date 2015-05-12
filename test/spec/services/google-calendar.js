'use strict';

describe('Service: googleCalendar', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var googleCalendar;
  beforeEach(inject(function (_googleCalendar_) {
    googleCalendar = _googleCalendar_;
  }));

  it('should do something', function () {
    expect(!!googleCalendar).toBe(true);
  });

});
