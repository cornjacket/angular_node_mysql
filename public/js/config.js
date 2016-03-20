//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/gateways', {
            templateUrl: 'views/gateways/list.html'
        }).
        when('/gateways/create', {
            templateUrl: 'views/gateways/create.html'
        }).
        when('/gateways/:gatewayId/edit', {
            templateUrl: 'views/gateways/edit.html'
        }).
        when('/gateways/:gatewayId', {
            templateUrl: 'views/gateways/view.html'
        }).
        when('/ranches', {
        templateUrl: 'views/ranches/list.html'
        }).
        when('/ranches/create', {
            templateUrl: 'views/ranches/create.html'
        }).
        when('/ranches/:ranchId/edit', {
            templateUrl: 'views/ranches/edit.html'
        }).
        when('/ranches/:ranchId', {
            templateUrl: 'views/ranches/view.html'
        }).        
        when('/sensors', {
            templateUrl: 'views/sensors/list.html'
        }).
        when('/sensors/create', {
            templateUrl: 'views/sensors/create.html'
        }).
        when('/sensors/:sensorId/edit', {
            templateUrl: 'views/sensors/edit.html'
        }).        
        when('/sensors/:sensorId', {
            templateUrl: 'views/sensors/view.html'  // TBD - DRT
        }).         
        when('/sensor-updates', {
            templateUrl: 'views/sensor-updates/list.html'
        }).        
        when('/sensor-updates/:sensorUpdateId', {
            templateUrl: 'views/sensor-updates/view.html'  // TBD - DRT
        }).        
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);

/* removed for now - since having problems with grunt file
angular.module('mean').config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});*/