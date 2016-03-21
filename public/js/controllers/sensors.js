angular.module('mean.sensors').controller('SensorsController', ['$scope', '$routeParams', '$location', 'Global', 'Ranches', 'Gateways', 'Sensors', function ($scope, $routeParams, $location, Global, Ranches, Gateways, Sensors) {
    
    console.log("SensorsController() is being invoked.")
    
    $scope.global = Global;

    $scope.create = function() {
        var sensor = new Sensors({
            name: this.name,
            macAddress: this.macAddress,
            logicalId: this.logicalId,
            lat: this.lat,
            lon: this.lon,
            GatewayId: this.GatewayId
        });

        sensor.$save(function(response) {
            console.log(response);
            //$location.path("sensors/" + response.id); // THIS IS BROKEN - TO BE FIXED.
            $location.path("sensors")
        });

        this.name = "";
        this.macAddress = "";
        this.lat = "";
        this.lon = "";
        this.logicalId = "";
        this.GatewayId = "";
    };

/* DRT - dont think I want users to be able to delete a sensor because of the implication it means at the gateway 
    $scope.remove = function(sensor) {
        if (sensor) {
            sensor.$remove();  

            for (var i in $scope.sensors) {
                if ($scope.sensors[i] === sensor) {
                    $scope.sensors.splice(i, 1);
                }
            }
        }
        else {
            $scope.sensor.$remove();
            $location.path('sensors');
        }
    };
*/
    $scope.update = function() {
        var sensor = $scope.sensor;
        if (!sensor.updated) {
            sensor.updated = [];
        }
        sensor.updated.push(new Date().getTime());

        sensor.$update(function() {
            $location.path('sensors/' + sensor.id);
        });
    };

    $scope.find = function() {
        Sensors.query(function(sensors) {
            $scope.sensors = sensors;
        });
    };

    $scope.findOne = function() {
        Sensors.get({
            sensorId: $routeParams.sendorId
        }, function(sensor) {
            $scope.sensor = sensor;
        });
    };
    
    $scope.findRanches = function() {
        Ranches.query(function(ranches) {
            $scope.ranches = ranches;
        });
    }; 
    
    // return all gateways that match RanchId
    $scope.findGatewaysByRanchId = function() {
        Gateways.query(function(gateways) {
            console.log(gateways)
            $scope.gateways = gateways.filter(function(gateway) {
                return gateway.RanchId == $scope.RanchId;
            });
        });
    };     
    
    // shouldn't I be initially assigning sensors and gateways and ranches to []. maybe inside an init routine.
    
}]);