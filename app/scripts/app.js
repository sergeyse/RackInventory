'use strict';

/**
 * @ngdoc overview
 * @name gridApp
 * @description
 * # gridApp
 *
 * Main module of the application.
 */
angular
  .module('gridApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
      'ui.grid',
      'ui.grid.edit',
      'ui.grid.rowEdit',
      'ui.grid.cellNav',
      'ui.grid.resizeColumns',
      'ui.grid.moveColumns',
      'firebase',
      'ui.bootstrap'

  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
    /*    templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'*/
          redirectTo: '/maingrid'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/maingrid', {
        templateUrl: 'views/maingrid.html',
        controller: 'MaingridCtrl',
        controllerAs: 'maingrid'
      })
      .when('/statistic', {
        templateUrl: 'views/statistic.html',
        controller: 'StatisticCtrl',
        controllerAs: 'statistic'
      })
      .when('/history', {
        templateUrl: 'views/history.html',
        controller: 'HistoryCtrl',
        controllerAs: 'history'
      })
      .when('/historysearch/:rackNr', {
        templateUrl: 'views/historysearch.html',
        controller: 'HistorysearchCtrl',
        controllerAs: 'historysearch'
      })
      .when('/homegrid', {
        templateUrl: 'views/homegrid.html',
        controller: 'HomegridCtrl',
        controllerAs: 'homegrid'
      })
      .when('/housekeeping', {
        templateUrl: 'views/housekeeping.html',
        controller: 'HousekeepingCtrl',
        controllerAs: 'housekeeping'
      })
      .otherwise({
        redirectTo: '/maingrid'
      });
  });
