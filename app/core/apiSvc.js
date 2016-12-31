/**
 * Content API Resource factory
 */
angular.module('ECore')
    .factory('apiSvc', [

        '$resource',
        '$q',
        'restApiCnst',
        'utilsSvc',

        function($resource, $q, restApiCnst, utilsSvc) {
            var _params = {},
                _actions = {
                    get: {
                        method: 'GET',
                        interceptor: {
                            responseError: function(rejection) {
                                return $q.reject(rejection);
                            }
                        },
                        transformResponse: function(response) {
                            return { data: utilsSvc.isJsonString(response) ?
                                angular.fromJson(response) :
                                []
                            };
                        }
                    }
                };

            /**
             * Instantiates $resource.
             * @param {string} entity Entity of restful api to instance.
             * @param {Object} paramDefaults Default parameters to instance resource.
             * @param {Object} actions Override actions in resource.
             * @return {Object} $resource instance.
             */
            function _instantiateResource(entity, paramDefaults, actions) {
                return $resource(entity,
                    angular.extend({}, _params, paramDefaults),
                    angular.extend({}, _actions, actions));
            }

            return {
                //getFirewallEvents: _instantiateResource(restApiCnst.firewallEvents)
            };
        }
]);
