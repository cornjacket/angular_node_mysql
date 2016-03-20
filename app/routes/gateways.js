'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
gateways = require('../../app/controllers/gateways');   /// do I need ranches too, maybe ????

module.exports = function(app) {
// Article Routes
app.route('/gateways')
    .get(gateways.all)
    .post(users.requiresLogin, gateways.create);
app.route('/gateways/:gatewayId')
    .get(gateways.show)
    .put(users.requiresLogin, gateways.hasAuthorization, gateways.update)
    .delete(users.requiresLogin, gateways.hasAuthorization, gateways.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('gatewayId', gateways.gateway);
};

