'use strict';

/**
* Module dependencies.
*/
var users = require('../../app/controllers/users'),
ranches = require('../../app/controllers/ranches');

module.exports = function(app) {
// Article Routes
app.route('/ranches')
    .get(ranches.all)
    .post(users.requiresLogin, ranches.create);
app.route('/ranches/:ranchId')
    .get(ranches.show)
    .put(users.requiresLogin, ranches.hasAuthorization, ranches.update)
    .delete(users.requiresLogin, ranches.hasAuthorization, ranches.destroy);

// Finish with setting up the articleId param
// Note: the articles.article function will be called everytime then it will call the next function.
app.param('ranchId', ranches.ranch);
};

