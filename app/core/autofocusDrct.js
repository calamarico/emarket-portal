/**
 * Autodirective Focus
 *
 */
angular.module('ECore')
    .directive('autoFocusDrct',

        function($timeout) {
            return {
                restrict: 'AC',
                link: function(_scope, _element) {
                    $timeout(function() {
                        _element[0].focus();
                    }, 0);
                }
            };
        }
    );
