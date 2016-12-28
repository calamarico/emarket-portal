/**
 * Generic utils.
 */
angular.module('ECore')
.factory('utilsSvc', [

    function() {
        /**
         * Checks if a string is a valid json.
         * @param {string} str String.
         * @return {boolean} True if it is a valid json string otherwise false.
         */
        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        return {
            isJsonString: isJsonString
        };
    }
]);
