'use strict';

/**
 * @ngdoc overview
 * @name FrontendApp
 * @description
 * # FrontendApp
 *
 * Main module of the application.
 */
angular
    .module('FrontendApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'pascalprecht.translate'
    ])
    .config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .run(['$rootScope', '$location', '$cookies', '$http', 'CONSTANTS', function($rootScope, $location, $cookies, $http, CONSTANTS) {
      $rootScope.header = "home";

      $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if(typeof($rootScope.user) == "undefined" || typeof($rootScope.user.id) == "undefined") {
          var bguToken = null;
          var tmpToken = false;
          if($cookies.bguToken) {
            bguToken = $cookies.bguToken;
          } else {
            if($cookies.tmpBguToken) {
              bguToken = $cookies.tmpBguToken;
              tmpToken = true;
            }
          }

          if(bguToken != null) {
            $http.post(CONSTANTS.backendUrl + CONSTANTS.loginFromTokenPath, {'token' : bguToken, 'tmp' : tmpToken})
              .success(function(data, status, headers, config) {
                $rootScope.user = data.user;

                if(tmpToken) {
                  $cookies.tmpBguToken = data.token;
                } else {
                  $cookies.bguToken = data.token;
                }

                $rootScope.header = "default";
                if(next.templateUrl === "views/home.html") {
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path('/dashboard');
                    });
                  } else {
                    $location.path('/dashboard');
                  }
                } // else // it's ok!
              })
              .error(function(data, status, headers, config) {
                delete($cookies.bguToken);
                delete($cookies.tmpBguToken);
                $rootScope.header = "home";
                if(next.templateUrl != "views/home.html") {
                  if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                      $location.path('/');
                    });
                  } else {
                    $location.path('/');
                  }
                }
              });
          } else {
            $rootScope.header = "home";
            if(next.templateUrl != "views/home.html") {
              if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                  $location.path('/');
                });
              } else {
                $location.path('/');
              }
            }
          }

        } else {
          $rootScope.header = "default";
          if(next.templateUrl === "views/home.html") {
            if (!$rootScope.$$phase) {
              $rootScope.$apply(function () {
                $location.path('/dashboard');
              });
            } else {
              $location.path('/dashboard');
            }
          }
        }
      });
    }]);
