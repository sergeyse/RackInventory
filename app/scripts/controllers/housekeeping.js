'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:HousekeepingCtrl
 * @description
 * # HousekeepingCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
    .controller('HousekeepingCtrl', ['$scope', '$http', 'uiGridConstants', 'firebase', '$firebaseArray', '$firebase', '$uibModal', '$filter', function ($scope, $http, uiGridConstants, firebase, $firebaseArray, $firebase, $uibModal, $filter) {




        var ref = firebase.database().ref();
        var homeRef = ref.child("home");
        $scope.historyRef = ref.child("history");

        $scope.allRacks = $firebaseArray(homeRef);
        $scope.allRacks.$loaded().then(function () {

            $scope.allRacksHome = $scope.allRacks.filter(function (rack) {
                //console.log('rack',rack.lendOut)
                return typeof rack.rack == 'number' && rack.lendOut === false ;
            });

            console.log('hosekeeping',$scope.allRacksHome);


            // TODO remove when done ! =========================================================================================   Begin remove unwanted records.
            /*  (function deleteUnwonted () {
             angular.forEach($scope.racksHome, function (value, key ) {

             if (typeof value.address !== 'undefined'){
             //  console.log(value.address.toString().localeCompare("Smiðjuvegur 7 "))

             if (value.address.toString() == "Smiðjuvegur 7 "){
             $scope.racksHome.$remove(value).then(function (r) {

             });
             console.log("+1" );

             }

             }
             // console.log("key",value)
             })
             })();
             */
            // TODO remove when done ! ===========================================================================================                         end  remove unwanted records.

        });

/*

$scope.deleteRack= function (rackToDel) {
    console.log('delet this .',rackToDel);
}
*/


    $scope.deleteRack = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation      : true,
            ariaLabelledBy : 'modal-titleIn',
            ariaDescribedBy: 'modal-bodyIn',
            templateUrl    : 'modalDelete.html',
            controller     : 'ModalDeleteCtrl',
            controllerAs   : '$ctrl',
            size           : size,
            appendTo       : parentElem,
            resolve        : {
                rackN: function () {
                    return $scope.rackNumber;
                }
            }
        });

    /*    modalInstance.result.then(function (rackCameHomeNr) {

            // ========= recording rack home on modal confirm OK ===========

            (function () {
                var count = 0; // counting how many racks we found during the iteration
                for (var i = 0; i < $scope.racksHome.length; i++) {  // iterate through all racks

                    if ($scope.racksHome[i].rack === rackCameHomeNr) { // check if it existed in all racks

                        if ($scope.racksHome[i].lendOut === true) {
                            $scope.racksHome[i].comeHomeTime = $filter("date")(Date.now(), 'yyyy-MM-dd HH:mm:ss');
                            addToHistory($scope.racksHome[i]);
                            $scope.racksHome[i].lendOut = false;
                            // =====test=====
                            $scope.allRacks.$save($scope.racksHome[i]);
                        } else {
                            alert('Rack was not rec inn last time ');
                            $scope.racksHome[i].lendOut = false;
                        }

                        count = count +1;

                    }

                }

                console.log("showing counter of the found racks",count);

                if (count == 0){
                    console.log('A new one rack found ')
                    alert('New Rack recorded in the system  ');


                }
                $scope.refreshTable();
                count = 0;

            })();

        }, function () {
            // $log.info('Modal dismissed at: ' + new Date());
        });*/
    };







        }
        ]
    );
