'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:HistorysearchCtrl
 * @description
 * # HistorysearchCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
  .controller('HistorysearchCtrl', ['$scope', '$firebase', '$location', '$filter', '$routeParams', '$firebaseArray', '$http', 'uiGridConstants', function ($scope, $firebase, $location, $filter, $routeParams, $firebaseArray, $http, uiGridConstants) {

    $scope.rackNr = $routeParams.rackNr;

    var recentPostsRef = firebase.database().ref('history/' + $scope.rackNr).limitToLast(10);


    $scope.rackHistory = $firebaseArray(recentPostsRef);
    $scope.rackHistory.$loaded().then(function () {

      $scope.uiHistory = $scope.rackHistory;

      console.log('history', $scope.uiHistory);
      $scope.gridOptions.data = $scope.uiHistory;

    });


    $scope.highlightFilteredHeader = function (row, rowRenderIndex, col, colRenderIndex) {
      if (col.filters[0].term) {
        return 'header-filtered';
      } else {
        return '';
      }
    };

    $scope.gridOptions = {
      columnDefs: [
        {
          name: 'Rekka nr.',
          field: 'rack',
          headerCellClass: $scope.highlightFilteredHeader,
          enableCellEdit: false,
          type: 'number',
          filter: {
            condition: uiGridConstants.EXACT,
            placeholder: 'exact'
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
          name: 'Dagsetning Út',
          field: 'lendOutTime',
          type: 'date',
            enableCellEdit: false,
          sort: {
            direction: uiGridConstants.DESC
            // ignoreSort: true,
            //  priority  : 0
          }
        },
        {
          name: 'Skráð Heim',
          field: 'comeHomeTime',
            enableCellEdit: false,

        }
      ],
      enableSorting: true,
      onRegisterApi: function (gridApi) {
        //set gridApi on scope
        $scope.gridApi = gridApi;

        $scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);

      },
      enableFiltering: true,
      enableCellEditOnFocus: true

    }

    $scope.gridOptions.enableFiltering = true;
    $scope.gridOptions.enableCellEditOnFocus = true;

  }]);
