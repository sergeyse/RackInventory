'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:HomegridCtrl
 * @description
 * # HomegridCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
  .controller('HomegridCtrl', [ '$scope', '$http', 'uiGridConstants', 'firebase', '$firebaseArray', '$firebase', '$uibModal', '$filter', function ($scope, $http, uiGridConstants, firebase, $firebaseArray, $firebase, $uibModal, $filter) {


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
                      condition  : uiGridConstants.EXACT          // TODO make an an exact search by a number
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

            //  {name: 'ATH', field: 'ath', cellTooltip: true, enableCellEdit: false, width: 300, enableSorting: false},
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
              {
                  name   : 'Lend Out',
                  field  : 'lendOut',
                  filter : {
                      term: 'false'
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
      $scope.gridOptions.enableCellEditOnFocus = false;

      $scope.refreshTable = function () {
          $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
      }


      var ref = firebase.database().ref();
      var homeRef = ref.child("home");

      $scope.allRacks = $firebaseArray(homeRef);
      $scope.allRacks.$loaded().then(function () {

          $scope.racksHome = $scope.allRacks;

          $scope.gridOptions.data = $scope.racksHome;

      });
  }]);
