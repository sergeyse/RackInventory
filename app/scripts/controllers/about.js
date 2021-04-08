'use strict';

/**
 * @ngdoc function
 * @name gridApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gridApp
 */
angular.module('gridApp')
  .controller('AboutCtrl', function ($http,$scope) {
/*var file =$http.get('VasaSkra.dat').then(function (result) {
    $scope.result = result.data;
    Papa.parse($scope.result, {
      //  worker: true, // Don't bog down the main thread if its a big file
        step: function(result) {
            // do stuff with result
        },
      /!*  complete: function(results, file) {
            console.log('parsing complete read', count, 'records.');
        }*!/
    });


})*/


Papa.parse('file://C:/Users/User/Desktop/VasaSkra.dat', {
    download:true
    }

)


  });
