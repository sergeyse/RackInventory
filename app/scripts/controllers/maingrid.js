'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:MaingridCtrl
 * @description
 * # MaingridCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
    .controller('MaingridCtrl', ['$scope', '$http', 'uiGridConstants', 'firebase', '$firebaseArray', '$firebase', '$uibModal', '$filter', function ($scope, $http, uiGridConstants, firebase, $firebaseArray, $firebase, $uibModal, $filter) {

        // TODO TOGGLE FILTERING  IN A HEADER http://ui-grid.info/docs//#!/tutorial/Tutorial:%20103%20Filtering
        $scope.rackNumber = "";

        $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
            if (col.filters[0].term) {
                return 'header-filtered';
            } else {
                return '';
            }
        };

        $scope.gridOptions = {
            columnDefs           : [
                {
                    name           : 'Rekka nr.',
                    field          : 'rack',
                    headerCellClass: $scope.highlightFilteredHeader,
                    enableCellEdit : false,
                    type           : 'number',
                    filter         : {
                        condition  : uiGridConstants.EXACT          // TODO make a search by a number
                    }
                },
                {name: 'Pöntun nr.', field: 'number', enableCellEdit: false, cellFilter: 'intFilter'},
                {name: 'Nafn', field: 'name', enableCellEdit: false},
                {name: 'Síminn', field: 'phone', enableCellEdit: false},
                {name: 'Afh.staður', field: 'delivaddress', enableCellEdit: false},
                {name: 'Post nr.', field: 'postN', enableCellEdit: false},
                {name: 'Afh. síminn', field: 'delivphone', enableCellEdit: false},
                {name: 'Leiga', field: 'rType', enableCellEdit: false},

                {name: 'Heimilisfang', field: 'address', enableCellEdit: false},

                {name: 'ATH', field: 'ath', cellTooltip: true, enableCellEdit: true, width: 300, enableSorting: false},
                {
                    name : 'Dagsetning Út',
                    field: 'lendOutTime',
                    type : 'date',
                    sort : {
                        direction: uiGridConstants.DESC
                        // ignoreSort: true,
                        //  priority  : 0
                    }
                },
            /*    {
                    name : 'Skráð INN',
                    field: 'comeHomeTime',
                    type : 'date',
                    enableCellEdit: false

                },*/

                {
                    name   : 'Lend Out',
                    field  : 'lendOut',
                    filter : {
                        term: 'true'
                    },
                    visible: false // switch to show all recks
                }
            ],
            enableSorting        : true,
            onRegisterApi        : function (gridApi) {
                //set gridApi on scope
                $scope.gridApi = gridApi;

                $scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);

            },
            enableFiltering      : true,
            enableCellEditOnFocus: true

        }

        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.enableCellEditOnFocus = true;

        $scope.refreshTable = function () {
            $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
        }

        $scope.saveRow = function (rowEntity) {

            $scope.gridApi.rowEdit.setSavePromise(rowEntity, $scope.allRacks.$save(rowEntity));

        };

        /*=================BEGIN Fetching data in firebase====================== */

        var ref = firebase.database().ref();
        var homeRef = ref.child("home");
        $scope.historyRef = ref.child("history");

        $scope.allRacks = $firebaseArray(homeRef);
        $scope.allRacks.$loaded().then(function () {

            $scope.racksHome = $scope.allRacks;

            $scope.gridOptions.data = $scope.racksHome;
                         end  remove unwanted records.

        });

        /*=================END Fetching data in firebase====================== */

        // -----------------------BEGIN MODAL for Rec Come Home ----------------------------

        $scope.openModalRecHome = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation      : true,
                ariaLabelledBy : 'modal-titleIn',
                ariaDescribedBy: 'modal-bodyIn',
                templateUrl    : 'myModalContentIn.html',
                controller     : 'ModalinstanceInCtrl',
                controllerAs   : '$ctrl',
                size           : size,
                appendTo       : parentElem,
                resolve        : {
                    rackN: function () {
                        return $scope.rackNumber;
                    }
                }
            });

            modalInstance.result.then(function (rackCameHomeNr) {

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
            });
        };

        // -----------------------END MODAL for RecCome Home ----------------------------

        // -----------------------BEGIN MODAL for customer data insertion ----------------------------

        //TODO - check a history all racks reference for a new rack record - see modal for come home
        $scope.openModal = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;

            var modalInstance = $uibModal.open({
                animation      : true,
                ariaLabelledBy : 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl    : 'myModalContent.html',
                controller     : 'ModalinstanceCtrl',
                controllerAs   : '$ctrl',
                size           : size,
                appendTo       : parentElem,
                resolve        : {
                    rackN: function () {
                        return $scope.rackNumber;
                    }
                }
            });

            modalInstance.result.then(function (lendOutDataFromModal) {
                $scope.landOutRackData = lendOutDataFromModal;
                $scope.doSkraUt();

            }, function () {
                //  $log.info('Modal dismissed at: ' + new Date());
            });
        };

        // -----------------------END MODAL for customer data insertion ----------------------------

        $scope.doSkraUt = function () {
            console.log("in skraut");

    
            var connectedRef = firebase.database().ref(".info/connected");
            connectedRef.on("value", function (snap) {
                if (snap.val() === true) {
                    console.log("connected");
                } else {
                    alert(" ATH ! Ekki samband með backend,vinsamlega skrá rekka á afgeiðslublað");
                }
            });

            //here we write to a firebase
            $scope.landOutRackData.lendOutTime = $filter("date")(Date.now(), 'yyyy-MM-dd HH:mm:ss');
            if ($scope.racksHome) {
                //checking an empty array on a database initialization/access
                for (var i = 0; i < $scope.racksHome.length; i++) { // the sequense need fix .promise is deleting  a wrong rec
                    console.log('iterate all racks objects ' + $scope.racksHome[i]);
                    if ($scope.racksHome[i].rack == $scope.landOutRackData.rack) {
                     
                        //do rec to a history firebase an delete from home

                        if ($scope.racksHome[i].lendOut == true){
                            $scope.racksHome[i].comeHomeTime = $filter("date")(Date.now(), 'yyyy-MM-dd HH:mm:ss');


                            // ==== Adding rec to a history ==========
                            $scope.racksHome[i].lendOut == false;
                           addToHistory($scope.racksHome[i]);
                        }

                        $scope.allRacks.$remove($scope.racksHome[i]).then(function (r) {
                            console.log("remved id " + r);
                        });
                    }
                    ;
                }
                ;
                recUt();
                $scope.refreshTable();
            }
            ;

            $scope.landOutRackData = {};
            $scope.rackNumber = "";

        };

        function recUt() {
            $scope.landOutRackData.lendOut = true;
            $scope.allRacks.$add($scope.landOutRackData).then(function (ref) {
                console.log("added a new rec" + ref.key);

            

            });

        };

        function addToHistory(rackData) {
            var currentRackNodeRef = $scope.historyRef.child(rackData.rack);
            var rackNodeHistoryArray = $firebaseArray(currentRackNodeRef);
            rackNodeHistoryArray.$add(rackData);
        }

    }])

    .filter('intFilter', function () {
        return function (val) {
            return Number(val);

        }

    });
