'use strict';

describe('Service: Community', function () {

  // load the service's module
  beforeEach(module('barliftApp'));

  // instantiate service
  var Community;
  beforeEach(inject(function (_Community_) {
    Community = _Community_;
  }));

  it('should do something', function () {
    expect(!!Community).toBe(true);
  });

});
