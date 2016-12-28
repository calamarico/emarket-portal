angular.module('EModal').controller('modalNotifyCtrl', [
    '$scope',
    'close',
    'textMsg',

    function($scope, close, textMsg) {
        $scope.textMsg = textMsg;
        $scope.dismissModal = function(result) {
            close(result, 200); // close, but give 200ms for bootstrap to animate
        };
    }
]);
