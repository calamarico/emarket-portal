angular.module('ELayout')
    .directive(
        'layoutDrct', [
            '$rootScope',

            function($rootScope) {
                return {
                    controller: 'layoutCtrl',
                    templateUrl: 'layout/layoutDrct.html',

                    link: function(scope, element) {
                        /**
                         * Expands or collapses the sidebar checking if layout is on device mode or in desktop
                         */
                        scope.toggleSidebar = function() {
                            if (checkIfDeviceMode()) {
                                $rootScope.sidebarCollapsedResponsive =
                                    ! $rootScope.sidebarCollapsedResponsive;
                            } else {
                                $rootScope.sidebarCollapsed = ! $rootScope.sidebarCollapsed;
                            }
                        };

                        /**
                         * Toggles panel
                         */
                        scope.togglePanel = function() {
                            scope.panelCollapsed = !scope.panelCollapsed;
                        };

                        /**
                         * Checks if layout is on 'device mode' watching the associate class on body
                         *
                         * @return {Boolean} True if layout is on device mode. False instead.
                         */
                        function checkIfDeviceMode() {
                            return angular.element(document.body).css('clear') === 'left';
                        }

                        /**
                         * Handles click event.
                         *  At the moment is used to handle right click in computer's table to activate item.
                         *
                         * @param {Object} event Angular $event.
                         * @param {Function} callback Callback to execute.
                         * @param {Object} item Computer row to activate.
                         */
                        scope.handleComputerClick = function(event, callback, item) {
                            if (event.which === 3) {
                                // Right click
                                callback(item, true); // Call selectRow with noUnselect true.
                            }
                        };
                    }
                };
            }
        ]
    );
