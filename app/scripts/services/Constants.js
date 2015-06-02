'use strict';

/**
 * @ngdoc function
 * @name FrontendApp.service:CONSTANTS
 * @description
 * # BCONSTANTS
 * Service of the FrontendApp
 */
angular.module('FrontendApp')
  .constant('CONSTANTS', {
    backendUrl: 'http://localhost:4000/',
    //backendUrl: 'http://backend.herokuapp.com/',
    loginPath: 'users/login',
    loginFromTokenPath: 'users/loginFromToken'
  });
