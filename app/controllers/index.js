'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');


exports.render = function(req, res) {
    console.log("DRT")
    console.log(req.body)
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};
