//SensorUpdates service used for sensorUpdates REST endpoint
angular.module('mean.sensorUpdates').factory("SensorUpdates", ['$resource', function($resource) {
    return $resource('sensor-updates/:sensorUpdateId', {
        sensorUpdateId: '@id'
    }
    //, { update: {  method: 'PUT' } }
    );
}]);