angular.module('ELayout')
    .controller('topbarCtrl', [
        '$scope',
        'authSvc',
        '$i18next',
        function($scope, authSvc, $i18next) {
            $scope.user = authSvc.user;
            $scope.logout = authSvc.logout;
            $scope.tenantName = authSvc.session.tenantName || $i18next('header.defaultTenant');
        }
    ]);
