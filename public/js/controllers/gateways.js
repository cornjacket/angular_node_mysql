angular.module('mean.gateways').controller('GatewaysController', ['$scope', '$routeParams', '$location', 'Global', 'Ranches', 'Gateways', function ($scope, $routeParams, $location, Global, Ranches, Gateways) {
    $scope.global = Global;

    $scope.create = function() {
        console.log("GatewaysController.create() RanchId = "+this.RanchId);
        var gateway = new Gateways({
            name: this.name,
            lat: this.lat,
            lon: this.lon,
            logicalId: this.logicalId,
            ipAddress: this.ipAddress,
            RanchId: this.RanchId
        });

        gateway.$save(function(response) {
            console.log(response);
            $location.path("gateways/" + response.id);
        });

        this.name = "";
        this.lat = "";
        this.lon = "";
        this.logicalId = "";
        this.ipAddress = "";
        this.RanchId = "";
    };

    $scope.remove = function(gateway) {
        if (gateway) {
            gateway.$remove();  

            for (var i in $scope.gateways) {
                if ($scope.gateways[i] === gateway) {
                    $scope.gateways.splice(i, 1);
                }
            }
        }
        else {
            $scope.gateway.$remove();
            $location.path('gateways');
        }
    };

    $scope.update = function() {
        var gateway = $scope.gateway;
        if (!gateway.updated) {
            gateway.updated = [];
        }
        gateway.updated.push(new Date().getTime());

        gateway.$update(function() {
            $location.path('gateways/' + gateway.id);
        });
    };

    $scope.find = function() {
        Gateways.query(function(gateways) {
            $scope.gateways = gateways;
        });
    };

    $scope.findOne = function() {
        Gateways.get({
            gatewayId: $routeParams.gatewayId
        }, function(gateway) {
            $scope.gateway = gateway;
        });
    };
    
    // return all gateways that match RanchId
    $scope.findAllByRanchId = function(RanchId) {
        Gateways.query(function(gateways) {
            $scope.gateways = gateways.filter(function(gateway) {
                return gateway.RanchId === RanchId;
            });
        });
    };    
    
    
    $scope.findRanches = function() {
        Ranches.query(function(ranches) {
            $scope.ranches = ranches;
        });
    };    
    
}]);