'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
sensors = require('../../app/controllers/sensors'); 

module.exports = function(app) {
// Article Routes
app.route('/sensors')
    .get(sensors.all)
    .post(users.requiresLogin, sensors.create);
app.route('/sensors/:sensorId')
    .get(sensors.show)
    .put(users.requiresLogin, sensors.hasAuthorization, sensors.update)
    //.delete(users.requiresLogin, gateways.hasAuthorization, gateways.destroy); // dont think we should delete sensors, maybe just have a disabled field

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('sensorId', sensors.sensor);
};

