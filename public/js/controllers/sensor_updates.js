angular.module('mean.sensorUpdates').controller('SensorUpdatesController', ['$scope', '$routeParams', '$location', 'Global', 'SensorUpdates', 'Ranches', 'Gateways', 'Sensors', function ($scope, $routeParams, $location, Global, SensorUpdates, Ranches, Gateways, Sensors) {
    $scope.global = Global;
/*
    $scope.create = function() {
        var article = new Articles({
            title: this.title,
            content: this.content
        });

        article.$save(function(response) {
            console.log(response);
            $location.path("articles/" + response.id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();  

            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }
        else {
            $scope.article.$remove();
            $location.path('articles');
        }
    };

    $scope.update = function() {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article.id);
        });
    };
*/
    // The problem with the function is that it will pull all sensorUpdates, regardless of user/account - At least i think
    $scope.find = function() {
        console.log("SensorUpdatesController.find() invoked. Issue to be resolved.")
        SensorUpdates.query(function(sensorUpdates) {
            $scope.sensorUpdates = sensorUpdates;
        });
    };

    $scope.findOne = function() {
        SensorUpdates.get({
            sensorUpdateId: $routeParams.sensorUpdateId
        }, function(sensorUpdate) {
            $scope.sensorUpdate = sensorUpdate;
        });
    };
    
    $scope.findBySensorId = function() {
        
        // if sensorId == "ALL", then need to make a list of valid sensorId's from the current list of sensors, then filter on that
        
        SensorUpdates.query(function(sensorUpdates) {
            $scope.sensorUpdates = ($scope.sensorId == "All") ? sensorUpdates : // this is not right, still needs to filter for sensor id 1,2, or 3 only
                sensorUpdates.filter(function(sensorUpdate) {  return (sensorUpdate.SensorId == $scope.SensorId);
            });
            console.log("SensorUpdatesController.findBySensorId() invoked");
            console.log($scope.sensorUpdates);
            console.log($scope.sensorId);
        });
    };    
    
    $scope.findRanches = function() {
        Ranches.query(function(ranches) {
            $scope.ranches = ranches;
        });
    };     

    $scope.findGatewaysByRanchId = function() {
        console.log("SensorUpdatesController.findGatewayByRanchId() invoked.");
        $scope.GatewayId = "All"; // Need to check for All
        Gateways.query(function(gateways) {
            console.log(gateways)
            $scope.gateways = gateways.filter(function(gateway) {
                return gateway.RanchId == $scope.RanchId;
            });
        });
    };  

    $scope.findSensorsByGatewayId = function() {
        console.log("SensorUpdatesController.findSensorsByGatewayId() invoked.");
        Sensors.query(function(sensors) {
            $scope.sensors = ($scope.GatewayId == "All") ? sensors :
                sensors.filter(function(sensor) { return sensor.GatewayId == $scope.GatewayId; });
            console.log($scope.sensors);
        });
    }; 
  

    $scope.findSensorUpdatesAndRanches = function() {
        $scope.ranches = []; // are these needed?
        $scope.gateways = []; // needed?
        $scope.sensors = []; // needed?
        $scope.find();
        $scope.findRanches();
    };
    
    
    
    
}]);