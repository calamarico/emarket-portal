angular.module('ELayout')
    .directive(
        'topbarDrct',

        function() {
            return {
                templateUrl: 'layout/topbarDrct.html',
                controller: 'topbarCtrl'
            };
        }
    );
