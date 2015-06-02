'use strict';

/**
 * @ngdoc function
 * @name FrontendApp.controller:MainCtrl
 * @description
 * # HeaderCtrl
 * Controller of the FrontendApp
 */
angular.module('FrontendApp')
    .controller('HeaderCtrl', ["$rootScope", "$scope", "$translate", "$location", "$http", "CONSTANTS", "$cookies", function ($rootScope, $scope, $translate, $location, $http, CONSTANTS, $cookies) {
        $rootScope.user = {};

        $scope.langKey = $translate.use();

        $scope.changeLanguage = function (langKey) {
            $scope.langKey = langKey;
            $translate.use(langKey);
        };

        $scope.login = function(user) {
          var shaObj = new jsSHA(user.password, "TEXT");
          var encryptedPwd = shaObj.getHash("SHA-256", "HEX");

          $http.post(CONSTANTS.backendUrl + CONSTANTS.loginPath, {'usernameOrEmail' : user.usernameOrEmail, 'password' : encryptedPwd})
            .success(function(data, status, headers, config) {
              $rootScope.user = data.user;

              if(user.remember) {
                delete($cookies.tmpBguToken);
                $cookies.bguToken = data.token;
              } else {
                delete($cookies.bguToken);
                $cookies.tmpBguToken = data.token;
              }

              if (!$rootScope.$$phase) {
                $rootScope.$apply(function () {
                  $location.path('/dashboard');
                });
              } else {
                $location.path('/dashboard');
              }
            })
            .error(function(data, status, headers, config) {
              //TODO: Manage error during post => display error message
              console.log("fail login during POST");
            });
        };

        $scope.logout = function() {
          $rootScope.user = {};

          delete($cookies.tmpBguToken);
          delete($cookies.bguToken);

          if (!$rootScope.$$phase) {
            $rootScope.$apply(function () {
              $location.path('/');
            });
          } else {
            $location.path('/');
          }
        };
    }]);
