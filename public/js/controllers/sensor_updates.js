angular.module('mean.sensorUpdates').controller('SensorUpdatesController', ['$scope', '$routeParams', '$location', 'Global', 'SensorUpdates', function ($scope, $routeParams, $location, Global, SensorUpdates) {
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
    $scope.find = function() {
        SensorUpdates.query(function(sensorUpdates) {
            $scope.sensorUpdates = sensorUpdates;
            //$scope.sensorUpdates.forEach(function(sensorUpdate) {
            //    sensorUpdate.tempC = (3.0 * ( Number(sensorUpdate.data) )/65535.0) -0.75 ) * 100.0 + 25.0; // DRT should be to float
            //    console.log("tempC = "+str(sensorUpdate.tempC));
            //});
        });
    };

    $scope.findOne = function() {
        SensorUpdates.get({
            sensorUpdateId: $routeParams.sensorUpdateId
        }, function(sensorUpdate) {
            $scope.sensorUpdate = sensorUpdate;
        });
    };
}]);