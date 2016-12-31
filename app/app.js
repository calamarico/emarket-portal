var MakeApp = angular
    .module('EApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'jm.i18next',
        'ngTable',
        'angularModalService',
        'ui.bootstrap',
        'ECore',
        'ELayout',
        'EDashboard',
        'EModal'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'dashboard/dashboard.html',
                controller: 'dashboardCtrl'
        })

        // Others
        .otherwise({
            redirectTo: '/'
        });
    }])

    .config(['$i18nextProvider', function($i18nextProvider) {
        $i18nextProvider.options = {
            useCookie: true,
            useLocalStorage: false,
            fallbackLng: ['es-ES'],
            resGetPath: '../locales/__lng__.json',
            lngWhitelist: ['en-US', 'es-ES'],
            defaultLoadingValue: '' // default value showed while i18next is loading.
        };
    }]);
