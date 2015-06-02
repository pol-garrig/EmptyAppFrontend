'use strict';

/**
 * @ngdoc overview
 * @name FrontendApp
 * @description
 * # FrontendApp
 *
 * Routes module of the application.
 */
angular
    .module('FrontendApp')
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
