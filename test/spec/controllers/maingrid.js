'use strict';

describe('Controller: MaingridCtrl', function () {

  // load the controller's module
  beforeEach(module('gridApp'));

  var MaingridCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MaingridCtrl = $controller('MaingridCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MaingridCtrl.awesomeThings.length).toBe(3);
  });
});
