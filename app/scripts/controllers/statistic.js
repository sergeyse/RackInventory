'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:StatisticCtrl
 * @description
 * # StatisticCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
  .controller('StatisticCtrl', ['$scope','firebase','$firebaseArray','$firebase', function ($scope,firebase, $firebaseArray,$firebase) {



      var ref = firebase.database().ref();
      var homeRef = ref.child("home");
      $scope.historyRef = ref.child("history");
      //   $scope.allRacksHistoryRef = ref.child("allracksinhistory");
      $scope.allRacks = $firebaseArray(homeRef);
      $scope.allRacks.$loaded().then(function () {
          // ---------------- BEGIN Show    STATISTIC --------------------------------------------------
          $scope.showTotalRacks = $scope.allRacks.reduce( function (sum, rack) {
              return sum + 1 ;

          },0);

          var allRacksOut =   $scope.allRacks.filter(function (rack) {
              //console.log('rack',rack.lendOut)
              return rack.lendOut === true&& typeof rack.rack == 'number';
          });
          $scope.showLandedOut = allRacksOut.reduce(function (sum,rack) {
              return sum +1 ;

          },0);

          var bigRacksOut = allRacksOut.filter(function (rack) {
              return  typeof rack.rack == 'number' && rack.rack <= 999;
          });

          $scope.showBigRacksOut = bigRacksOut.reduce(function (sum,rack) {
              return sum +1 ;

          },0);
       //   console.log('array',$scope.recordsWithRackNr);
          // calc all small medium and big one
          var medRacksOut = $scope.allRacks.filter(function (rack) {
              return typeof rack.rack == 'number' && rack.lendOut === true && rack.rack >= 999 && rack.rack <=1999;
          });

          $scope.showMedRacksOut = medRacksOut.reduce(function (sum,rack) {
              return sum +1 ;

          },0);

          var smRacksOut = $scope.allRacks.filter(function (rack) {
              return typeof rack.rack == 'number' && rack.lendOut === true && rack.rack >= 1999 && rack.rack <=2999 ;
          });

          $scope.showSmRacksOut = smRacksOut.reduce(function (sum,rack) {
              return sum +1 ;

          },0);


          var restsOut = $scope.allRacks.filter(function (rack) {
              return typeof rack.rack == 'number' && rack.lendOut === true && rack.rack >= 3999;
          });


          $scope.restMixSizesOut = restsOut.reduce(function (sum,rack) {
              return sum +1 ;

          },0);
        //  -------------------------------- Racks HOME ----------------

          var allRacksIn =   $scope.allRacks.filter(function (rack) {
              //console.log('rack',rack.lendOut)
              return typeof rack.rack == 'number' && rack.lendOut === false ;
          });
          $scope.showAllHome = allRacksIn.reduce(function (sum,rack) {
              return sum +1 ;

          },0);

        var bigRacksHome = allRacksIn.filter(function (rack) {
              return  typeof rack.rack == 'number' && rack.rack <= 999;
          });

          $scope.showBigRacksHome = bigRacksHome.reduce(function (sum,rack) {
              return sum +1 ;

          },0);

          var medRacksIn = allRacksIn.filter(function (rack) {
              return typeof rack.rack == 'number' && rack.lendOut === false && rack.rack >= 999 && rack.rack <=1999;
          });
          $scope.showMedRacksIn = medRacksIn.reduce(function (sum,rack) {
              return sum +1 ;

          },0);
          var smRacksIn = allRacksIn.filter(function (rack) {
              return typeof rack.rack == 'number' && rack.rack >= 1999 && rack.rack <=2999 ;
          });
          $scope.showSmRacksIn = smRacksIn.reduce(function (sum,rack) {
              return sum +1 ;

          },0);

          var restsIn = allRacksIn.filter(function (rack) {
              return typeof rack.rack == 'number'  && rack.rack >= 3999;
          });


          $scope.restMixSizesIn = restsIn.reduce(function (sum,rack) {
              return sum +1 ;

          },0);



          // ---------------- END Show    STATISTIC --------------------------------------------------


      });
  }]);
