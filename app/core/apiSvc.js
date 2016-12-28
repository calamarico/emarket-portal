/**
 * Content API Resource factory
 */
angular.module('ECore')
    .factory('apiSvc', [

        '$resource',
        '$q',
        'restApiCnst',
        'loginInterceptorSvc',
        'sessionIdsSvc',
        'utilsSvc',

        function($resource, $q, restApiCnst, loginInterceptorSvc, sessionIdsSvc, utilsSvc, $cachedResource) {
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
                        },
                        headers: {
                            'Authorization': function(config) {
                                return sessionIdsSvc.getSID();
                            }
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

            /**
             * Instantiates $cachedResource.
             * @param {string} entity Entity of restful api to instance.
             * @param {string} urlEntity Url of restful api to instance.
             * @param {Object} paramDefaults Default parameters to instance resource.
             * @param {Object} actions Override actions in resource.
             * @return {Object} $resource instance.
             */
            function _instantiateCachedResource(entity, urlEntity, paramDefaults, actions) {
                var _cachedResource = $cachedResource(entity, urlEntity,
                    angular.extend({}, _params, paramDefaults),
                    angular.extend({}, _actions, actions));
                _cachedResource.$clearCache();
                return _cachedResource;
            }

            /**
             * return session ID
             * @return {String} Session ID
             */
            function getSessionId() {
                return sessionIdsSvc.getIds().sID;
            }

            /**
             * Define session IDs
             * @param {Object} session  Session object
             * @return {Object}         ApiSvc instance
             */
            function setSession(session) {
                sessionIdsSvc.setIds(session);
                sessionIdsSvc.setSID(session.tenantSID || session.sID);
                return this;
            }

            return {
                login: _instantiateResource(restApiCnst.login, {}, {
                    post: {
                        method: 'POST',
                        interceptor: loginInterceptorSvc
                    }
                }),
                logoutsID: _instantiateResource(restApiCnst.logout, {}, {
                    delete: {
                        method: 'DELETE',
                        headers: {
                            'Authorization': function(config) {
                                return sessionIdsSvc.getIds().sID;
                            }
                        }
                    }
                }),
                logoutTenantSID: _instantiateResource(restApiCnst.logout, {}, {
                    delete: {
                        method: 'DELETE',
                        headers: {
                            'Authorization': function(config) {
                                return sessionIdsSvc.getIds().tenantSID;
                            }
                        }
                    }
                }),
                getComputerGroups: _instantiateCachedResource('groups', restApiCnst.groups),
                getComputerHosts: _instantiateCachedResource('hosts', restApiCnst.hosts),
                getComputerHostsDetailByID: _instantiateCachedResource('detail', restApiCnst.hostDetail),
                user: $resource(restApiCnst.user, {}, {
                    get: {
                        isArray: false,
                        headers: {
                            'Authorization': getSessionId
                        }
                    }
                }),
                setSession: setSession,
                clearWarningsErrors: _instantiateResource(restApiCnst.clear),
                deactivate: _instantiateResource(restApiCnst.deactivate),
                recommendationScan: _instantiateResource(restApiCnst.recomscan),
                antiMalwareScan: _instantiateResource(restApiCnst.malwarescan),
                integrityScan: _instantiateResource(restApiCnst.integrityscan),
                rebuildBaseline: _instantiateResource(restApiCnst.rebuildbaseline),
                getSystemEvents: _instantiateResource(restApiCnst.systemEvents),
                getWebReputationEvents: _instantiateResource(restApiCnst.webReputationEvents),
                getAntiMalwareEvents: _instantiateResource(restApiCnst.antiMalwareEvents),
                getLogInspectionEvents: _instantiateResource(restApiCnst.logInspectionEvents),
                getIntegrityEvents: _instantiateResource(restApiCnst.integrityEvents),
                getDPIEvents: _instantiateResource(restApiCnst.dpiEvents),
                getFirewallEvents: _instantiateResource(restApiCnst.firewallEvents)
            };
        }
]);
