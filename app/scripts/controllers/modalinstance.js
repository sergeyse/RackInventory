'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:ModalinstanceCtrl
 * @description
 * # ModalinstanceCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
  .controller('ModalinstanceCtrl', function ($uibModalInstance, rackN,$scope,$http) {
      console.log('items',rackN);

      $scope.order = {};

    //  var $ctrl = this;
      //$ctrl.modalRackN = rackN;
      $scope.modalRackN = rackN;

      $scope.fetch = function () {
        //  var restIP = window.localStorage.getItem('IP');
          var restIP = '192.168.81.3'
          $scope.spinner = true;
          //here we fatch json and populate form in modal
          console.log("My order", $scope.order);
          console.log("local storage IP ", restIP);
          //  $http.get('templates/' + $scope.order.number + '.json').then(function(resp) {
          $http.get('https://' + restIP + ':433/orders/search/findByPontun?pontun=' + $scope.order.number).then(function (resp) {
              console.log('Success', resp.data._embedded.orders[0]);
              $scope.order.name = resp.data._embedded.orders[0].name;
              $scope.order.address = resp.data._embedded.orders[0].address;
              $scope.order.phone = resp.data._embedded.orders[0].phone;
              $scope.order.delivaddress = resp.data._embedded.orders[0].delivaddress;
              $scope.order.delivphone = resp.data._embedded.orders[0].delivPhone;
              $scope.order.postN = resp.data._embedded.orders[0].deliverypostn;
          }, function (err) {
              console.error('ERR', err);
              alert("Vinsamlegast stilla backend", err);
              // err.status will contain the status code
          });
          $scope.spinner = false;
          console.log('scope model', $scope.racksHome)

      }



      $scope.ok = function () {
       //   $uibModalInstance.close($ctrl.selected.item);
          $scope.order.rack=$scope.modalRackN;
          $uibModalInstance.close($scope.order);
      };

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };
  });
