angular.module('ECore')
    .controller('coreCtrl', [
        '$scope',
        'applicationSvc',
        '$location',

        function($scope, applicationSvc, $location) {
            $(document).ready(function() {
                applicationSvc.init();
            });

            $scope.$on('$viewContentLoaded', function() {
                applicationSvc.customScroll();

                $('.nav.nav-sidebar .nav-active').removeClass('nav-active active');
                $('.nav.nav-sidebar .active:not(.nav-parent)')
                    .closest('.nav-parent')
                    .addClass('nav-active active');

                if ($location.$$path === '/' || $location.$$path === '/layout-api') {
                    $('.nav.nav-sidebar .nav-parent').removeClass('nav-active active');
                    $('.nav.nav-sidebar .nav-parent .children').removeClass('nav-active active');

                    if ($('body').hasClass('sidebar-collapsed') && ! $('body').hasClass('sidebar-hover')) {
                        return;
                    }

                    if ($('body').hasClass('submenu-hover')) {
                        return;
                    }

                    $('.nav.nav-sidebar .nav-parent .children').slideUp(200);
                    $('.nav-sidebar .arrow').removeClass('active');
                }

                if ($location.$$path === '/') {
                    $('body').addClass('dashboard');
                } else {
                    $('body').removeClass('dashboard');
                }

            });

            $scope.isActive = function(viewLocation) {
                return viewLocation === $location.path();
            };
        }
    ]);
