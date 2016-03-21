//Articles service used for articles REST endpoint
angular.module('mean.sensors').factory("Sensors", ['$resource', function($resource) {
    //console.log("DRT: sensors service has been called");
    return $resource('sensors/:sensorId', {
        sensorId: '@id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);