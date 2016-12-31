/**
 * Modal management service.
 */
angular.module('EModal')
    .factory('modalSvc', [

        '$rootScope',
        'ModalService',

        function($rootScope, modalService) {
            var SECTIONS_TEMPLATES = {
                systemEvents: 'modal/modalEventSystemTmpl.html',
                antiMalware: 'modal/modalAntiMalwareTmpl.html',
                webReputation: 'modal/modalWebReputationTmpl.html',
                intrusionPrevention: 'modal/modalIntrusionPreventionTmpl.html',
                integrityMonitoring: 'modal/modalIntegrityMonitoringTmpl.html',
                logInspection: 'modal/modalLogInspectionTmpl.html',
                firewall: 'modal/modalFirewallTmpl.html'
            };

            /**
             * Shows error modal.
             * @param {string} textMsg Text to show on body.
             * @return {promise}
             */
            function showModalError(textMsg) {
                $rootScope.$broadcast('spinnerOff');

                return modalService.showModal({
                    templateUrl: 'modal/modalErrorTmpl.html',
                    controller: 'modalErrorCtrl',
                    inputs: {
                        textMsg: textMsg
                    }
                }).then(function(modal) {
                    modal.element.modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                });
            }

            /**
             * Shows notify modal.
             * @param {string} textMsg Text to show on body.
             * @return {promise}
             */
            function showModalNotify(textMsg) {
                $rootScope.$broadcast('spinnerOff');

                return modalService.showModal({
                    templateUrl: 'modal/modalNotifyTmpl.html',
                    controller: 'modalNotifyCtrl',
                    inputs: {
                        textMsg: textMsg
                    }
                }).then(function(modal) {
                    modal.element.modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                });
            }

            return {
                showModalError: showModalError,
                showModalNotify: showModalNotify
            };
        }
]);
