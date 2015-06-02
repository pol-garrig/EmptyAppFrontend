'use strict';

/**
 * @ngdoc overview
 * @name FrontendApp
 * @description
 * # FrontendApp
 *
 * Translations module of the application.
 */
angular
    .module('FrontendApp')
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/locales/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('fr');
        $translateProvider.fallbackLanguage(['fr', 'en']);
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useMissingTranslationHandlerLog();
    }]);

