/**
 * Created by User on 24.10.2020.
 */



angular.module('gridApp')
    .controller('ModalDeleteCtrl', function ($uibModalInstance, rackN,$scope,$http) {
        console.log('RackNr in modal',rackN);



        $scope.modalRackNinn = rackN;

        $scope.ok = function () {

            $uibModalInstance.close($scope.modalRackNinn);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
