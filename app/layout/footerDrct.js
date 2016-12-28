angular.module('ELayout')
    .directive(
        'footerDrct',

        function() {
            return {
                replace: true,
                templateUrl: 'layout/footerDrct.html'
            };
        }
    );
