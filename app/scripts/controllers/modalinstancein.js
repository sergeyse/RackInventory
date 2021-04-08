'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:ModalinstanceCtrl
 * @description
 * # ModalinstanceCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
  .controller('ModalinstanceInCtrl', function ($uibModalInstance, rackN,$scope,$http) {
      console.log('RackNr in modal',rackN);



      $scope.modalRackNinn = rackN;

      $scope.ok = function () {

          $uibModalInstance.close($scope.modalRackNinn);
      };

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };
  });
