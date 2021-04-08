'use strict';

describe('Controller: HousekeepingCtrl', function () {

  // load the controller's module
  beforeEach(module('gridApp'));

  var HousekeepingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HousekeepingCtrl = $controller('HousekeepingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HousekeepingCtrl.awesomeThings.length).toBe(3);
  });
});
