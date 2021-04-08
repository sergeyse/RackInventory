'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:HistoryCtrl
 * @description
 * # HistoryCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
  .controller('HistoryCtrl',['$scope', '$http', 'uiGridConstants', 'firebase', '$firebaseArray', '$firebase', '$uibModal', '$filter', '$firebaseObject',  function ($scope, $http, uiGridConstants, firebase, $firebaseArray, $firebase, $uibModal, $filter, $firebaseObject) {



      var ref = firebase.database().ref();
      var historyRef = ref.child("history");


      $scope.allHistory = $firebaseObject(historyRef);
      $scope.allHistory.$loaded().then(function () {

          $scope.racksHistory = $scope.allHistory;

          console.log('history', $scope.racksHistory);

      });

      $http({method: 'get', url:'https://rack.firebaseio.com/history.json?shallow=true'}).then(
          function (responce) {
              console.log('responce http ',responce);
              $scope.resp = responce;

          }
      )

  }]);
