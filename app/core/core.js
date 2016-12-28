angular.module('ECore', [])
    .constant('LANGUAGES', {
        /* jshint ignore:start */
        es: 'es-ES',
        es_ES: 'es-ES',
        en: 'en-US',
        en_US: 'en-US',
        pt: 'pt-BR',
        pt_BR: 'pt-BR'
        /* jshint ignore:end */
    })
    .run([
        '$route',
        '$rootScope',
        '$i18next',
        '$timeout',
        '$cookies',
        '$window',
        'loginSvc',
        'LANGUAGES',

        function($route, $rootScope, $i18next, $timeout, $cookies, $window, loginSvc, LANGUAGES) {
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

            /**
             * Adding Lodash to the scope
             *
             * @type    {object}
             */
            $rootScope._ = _;

            // Detect and set language.
            $rootScope.changeLanguage(
                $cookies.get('i18next') ||
                $window.navigator.language ||
                $window.navigator.userLanguage);
        }
    ])
    // Configure authentication
    .run([
        '$rootScope',
        'authSvc',
        function($rootScope, auth) {
            /**
             * Is Logged
             *
             * @type    {Boolean}
             */
            $rootScope.isLogged = false;

            auth.autoLogin();
            auth.onLogin(function() {
                $rootScope.isLogged = auth.isLogged;
            });

            //@TODO configure interceptor
        }
    ]);
