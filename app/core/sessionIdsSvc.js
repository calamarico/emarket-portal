/**
 * Session Id manager service.
 */
angular.module('ECore')
    .factory('sessionIdsSvc', [
        function() {
            var sID = 0,
                ids = {
                    sID: 0,
                    tenantSID: 0
                };

            return {
                /**
                 * Returns current session id used by get requests.
                 * @return {string} session id.
                 */
                getSID: function() {
                    return sID;
                },
                /**
                 * Returns session ids object.
                 * @return {Object} Session ids object.
                 */
                getIds: function() {
                    return ids;
                },
                /**
                 * Sets current session id used by get requests.
                 * @param {string} _sID  Session id.
                 */
                setSID: function(_sID) {
                    sID = _sID;
                },
                /**
                 * Sets session ids object.
                 * @param {Object} _ids Session ids object.
                 */
                setIds: function(_ids) {
                    ids = _ids;
                }
            };
        }
]);
