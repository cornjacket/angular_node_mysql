//Articles service used for articles REST endpoint
angular.module('mean.gateways').factory("Gateways", ['$resource', function($resource) {
    return $resource('gateways/:gatewayId', {
        gatewayId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);