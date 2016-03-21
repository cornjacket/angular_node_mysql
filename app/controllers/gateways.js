'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find article by id
 * Note: This is called every time that the parameter :articleId is used in a URL. 
 * Its purpose is to preload the article on the req object then call the next function. 
 */
exports.gateway = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Gateway.find({ where: {id: id}, include: [db.Ranch]}).then(function(gateway){
        if(!gateway) {
            return next(new Error('Failed to load gateway ' + id));
        } else {
            req.gateway = gateway;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    // augment the gateway by adding the RanchId, should I add the userId also
    req.body.UserId = req.user.id;    // what about this, is this needed????????????? DRT
    //console.log('DRT - Testing in app/controllers/gateways.js');
    //console.log(req.body);
    //req.body.RanchId = 2; // 2 is Dave's ranch //req.ranch.id; // how does ranch get onto req <------------------- DRT ????????
    // save and return and instance of article on the res object. 
    db.Gateway.create(req.body).then(function(gateway){
        if(!gateway){
            return res.send('users/signup', {errors: new StandardError('Gateway could not be created')});
        } else {
            return res.jsonp(gateway);
        }
    }).catch(function(err){
        return res.send('users/signup', { 
            errors: err,
            status: 500
        });
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var gateway = req.gateway;

    gateway.updateAttributes({
        name: req.body.name,
        lat: req.body.lat,
        lon: req.body.lon,
        RanchId: req.body.RanchId,
        logicalId: req.body.logicalId,
        ipAddress: req.body.ipAddress
    }).then(function(a){
        return res.jsonp(a);
    }).catch(function(err){
        return res.render('error', {
            error: err, 
            status: 500
        });
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var gateway = req.gateway;

    gateway.destroy().then(function(){
        return res.jsonp(gateway);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    // Sending down the article that was just preloaded by the articles.article function
    // and saves article on the req object.
    return res.jsonp(req.gateway);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Gateway.findAll({include: [db.Ranch]}).then(function(gateways){
        return res.jsonp(gateways);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Article authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.gateway.Ranch.id !== req.ranch.id) {  // <----------- need to make sure that the ranch is added to the req
      return res.send(401, 'Ranch is not authorized');
    }
    next();
};
