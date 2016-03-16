'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
sensorUpdates = require('../../app/controllers/sensor_updates');

module.exports = function(app) {
// Article Routes
app.route('/sensor-updates')
    .get(sensorUpdates.all);
    //.post(users.requiresLogin, sensorUpdates.create);
app.route('/sensor-updates/:sensorUpdateId')
    .get(sensorUpdates.show);
    // The following routes do not exist
    //.put(users.requiresLogin, sensorUpdates.hasAuthorization, sensorUpdates.update)
    //.delete(users.requiresLogin, articles.hasAuthorization, articles.destroy);

// Finish with setting up the sensorUpdateId param
// Note: the sensorUpdates.sensorUpdate function will be called everytime then it will call the next function.
app.param('sensorUpdateId', sensorUpdates.sensorUpdate);
};

