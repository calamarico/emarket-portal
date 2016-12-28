'use strict';

angular.module('Eashboard')
    .controller('dashboardCtrl', [
        '$scope',
        'loginSvc',

        function($scope, loginSvc) {
            $scope.$on('$viewContentLoaded', function() {

            });

            $scope.activeTab = true;
        }
    ]);
