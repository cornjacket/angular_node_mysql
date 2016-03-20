angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [
    /*{
        "title": "Articles",
        "link": "articles"
    }, {
        "title": "Create New Article",
        "link": "articles/create"
    },*/    {
        "title": "Ranches",
        "link": "ranches"
    }, {
        "title": "Create New Ranch",
        "link": "ranches/create"
    },    {
        "title": "Gateways",
        "link": "gateways"
    }, {
        "title": "Create New Gateway",
        "link": "gateways/create"
    },,    {
        "title": "Sensors",
        "link": "sensors"
    }, {
        "title": "Create New Sensor",
        "link": "sensors/create"
    },
    {
        "title": "Sensor Updates",
        "link": "sensor-updates"
    }];
    
    $scope.isCollapsed = false;
}]);