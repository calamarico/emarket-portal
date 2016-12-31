angular.module('ECore', [])
    .constant('LANGUAGES', {
        /* jshint ignore:start */
        es: 'es-ES',
        es_ES: 'es-ES',
        en: 'en-US',
        en_US: 'en-US'
        /* jshint ignore:end */
    })
    .run([
        '$route',
        '$rootScope',
        '$i18next',
        '$timeout',
        '$cookies',
        '$window',
        'LANGUAGES',

        function($route, $rootScope, $i18next, $timeout, $cookies, $window, LANGUAGES) {
            /**
             * Change Language
             * Changes the UI language
             *
             * @param   {string}    language    The user language selected
             */
            $rootScope.changeLanguage = function(language) {
                var _old = $i18next.options.lng;

                // If do not have the language, set english.
                $i18next.options.lng =
                    LANGUAGES[language.replace('-', '_')] ||
                    LANGUAGES.en;

                if (_old !== $i18next.options.lng) {
                    $rootScope.$broadcast('changeLanguage');
                }
            };

            // Detect and set language.
            $rootScope.changeLanguage(
                $cookies.get('i18next') ||
                $window.navigator.language ||
                $window.navigator.userLanguage);
        }
    ]);
