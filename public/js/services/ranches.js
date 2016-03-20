//Articles service used for articles REST endpoint
angular.module('mean.ranches').factory("Ranches", ['$resource', function($resource) {
    return $resource('ranches/:ranchId', {
        ranchId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);