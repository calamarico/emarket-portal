/**
 * Spinner directive.
 */
angular.module('ELayout')
    .directive('spinnerLoaderDrct', [

        '$timeout',

        function($timeout) {
            return {
                link: function(scope, element) {
                    scope.$on('spinnerOn', function() {
                        element.removeClass('hide');
                    });

                    scope.$on('spinnerOff', function() {
                        element.addClass('hide');
                    });
                }
            };
        }
    ]);
