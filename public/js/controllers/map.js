// later we can change mean.articles into something else, don't think it should affect much
angular.module('mean.articles').controller("mapController", function($scope) { //, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    /* uiGmapGoogleMapApi.then(function(maps) {
        console.log("DRT - google maps is ready")
        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        $scope.options = {scrollwheel: false};
    });
    */
});

