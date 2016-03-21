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
exports.sensor = function(req, res, next, id) {
    console.log('id => ' + id);
    db.Sensor.find({ where: {id: id}, include: [db.Gateway]}).then(function(sensor){
        if(!sensor) {
            return next(new Error('Failed to load sensor ' + id));
        } else {
            req.sensor = sensor;
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
    // augment the sensor by adding the GatewayId, should I add the userId also
    req.body.UserId = req.user.id;    // what about this, is this needed????????????? DRT
    //console.log('DRT - Testing in app/controllers/sensors.js');
    req.body.GatewayId = 3; // 3 is Dave's gateway //req.gateway.id; // how does gateway get onto req <------------------- DRT ????????
    // save and return and instance of article on the res object. 
    db.Sensor.create(req.body).then(function(sensor){
        if(!sensor){
            return res.send('users/signup', {errors: new StandardError('Sensor could not be created')});
        } else {
            return res.jsonp(sensor);
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
    var sensor = req.sensor;

    sensor.updateAttributes({
        name: req.body.name,
        macAddress: req.body.macAddress,
        logicalId: req.body.logicalId,
        lat: req.body.lat,
        lon: req.body.lon,
        GatewayId: req.body.GatewayId
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
/* dont want to allow sensors to be deleted
exports.destroy = function(req, res) {

    // create a new variable to hold the article that was placed on the req object.
    var sensor = req.sensor;

    sensor.destroy().then(function(){
        return res.jsonp(sensor);
    }).catch(function(err){
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};
*/

/**
 * Show an article
 */
exports.show = function(req, res) {
    // Sending down the article that was just preloaded by the articles.article function
    // and saves article on the req object.
    return res.jsonp(req.sensor);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    db.Sensor.findAll({include: [db.Gateway]}).then(function(sensors){
        return res.jsonp(sensors);
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
// DRT - this doesnt make sense
exports.hasAuthorization = function(req, res, next) {
    console.log("SensorsController.hasAuthorization() Gateway ID's = "+req.sensor.Gateway.id+" "+req.GatewayId)
    if (req.sensor.Gateway.id !== req.GatewayId) {  // <----------- need to make sure that the ranch is added to the req
      return res.send(401, 'Sensor is not authorized');
    }
    next();
};
