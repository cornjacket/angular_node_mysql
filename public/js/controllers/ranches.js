angular.module('mean.ranches').controller('RanchesController', ['$scope', '$routeParams', '$location', 'Global', 'Ranches', function ($scope, $routeParams, $location, Global, Ranches) {
    $scope.global = Global;

    $scope.create = function() {
        var ranch = new Ranches({
            name: this.name,
            lat: this.lat, // later this can be an array
            lon: this.lon  // later this can be an array
        });

        ranch.$save(function(response) {
            console.log(response);
            $location.path("ranches/" + response.id);
        });

        this.name = 0.0;
        this.lat = 0.0;
        this.lon = 0.0;
    };

    $scope.remove = function(ranch) {
        if (ranch) {
            ranch.$remove();  

            for (var i in $scope.ranches) {
                if ($scope.ranches[i] === ranch) {
                    $scope.ranches.splice(i, 1);
                }
            }
        }
        else {
            $scope.ranch.$remove();
            $location.path('ranches');
        }
    };

    $scope.update = function() {
        var ranch = $scope.ranch;
        if (!ranch.updated) {
            ranch.updated = [];
        }
        ranch.updated.push(new Date().getTime());

        ranch.$update(function() {
            $location.path('ranches/' + ranch.id);
        });
    };

    $scope.find = function() {
        Ranches.query(function(ranches) {
            $scope.ranches = ranches;
        });
    };

    $scope.findOne = function() {
        Ranches.get({
            ranchId: $routeParams.ranchId
        }, function(ranch) {
            $scope.ranch = ranch;
        });
    };
}]);