// I had 'uiGmapGoogleMapApi', in the list below.
angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.sensorUpdates', 'mean.sensors', 'mean.articles', 'mean.ranches', 'mean.gateways']);

// DRT - what is the purpose of mean.system
angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.gateways', []);
angular.module('mean.ranches', []);
angular.module('mean.sensorUpdates', []);
angular.module('mean.sensors', []);
//angular.module('mean.map', []); // following convention - there is a map controller but my map controller is in articles