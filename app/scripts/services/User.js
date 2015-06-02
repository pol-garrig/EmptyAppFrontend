'use strict';

/**
 * @ngdoc function
 * @name FrontendApp.service:User
 * @description
 * # User
 * Service of the FrontendApp
 */
angular.module('FrontendApp')
  .factory('User', ["$resource", "CONSTANTS", function($resource, CONSTANTS) {
    return $resource(CONSTANTS.backendUrl + 'users/:id');
  }]);
