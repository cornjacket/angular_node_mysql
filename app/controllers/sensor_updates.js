'use strict';

/**
 * Module dependencies.
 */
var StandardError = require('standard-error');
var db = require('../../config/sequelize');

/**
 * Find sensorUpdate by id
 * Note: This is called every time that the parameter :sensorUpdateId is used in a URL. 
 * Its purpose is to preload the sensorUpdate on the req object then call the next function. 
 */
exports.sensorUpdate = function(req, res, next, id) {
    console.log('id => ' + id);
    //db.SensorUpdate.find({ where: {id: id}, include: [db.User]}).then(function(sensorUpdate){
    db.sensorData.find({ where: {id: id}, include: [db.User]}).then(function(sensorUpdate){
        if(!sensorUpdate) {
            return next(new Error('Failed to load sensor update ' + id));
        } else {
            req.sensorUpdate = sensorUpdate;
            return next();            
        }
    }).catch(function(err){
        return next(err);
    });
};

/**
 * Show a sensorUpdate
 */
exports.show = function(req, res) {
    console.log("sensorUpdateController.show() invoked.")
    // Sending down the sensorUpdate that was just preloaded by the articles.article function
    // and saves article on the req object.
    return res.jsonp(req.sensorUpdate);
};

/**
 * List of Sensor Updates
 */
exports.all = function(req, res) {
    console.log("sensorUpdateController.all() invoked.")
    //db.SensorUpdate.findAll({include: [db.User]}).then(function(sensorUpdates){
    db.SensorUpdate.findAll().then(function(sensorUpdates){    
    //db.sensorData.findAll().then(function(sensorUpdates){ 
        console.log("db.SensorUpdate.findAll() call handler invoked");
        return res.jsonp(sensorUpdates);
    }).catch(function(err){
        console.log("db.SensorUpdate.findAll() error handler invoked");
        return res.render('error', {
            error: err,
            status: 500
        });
    });
};

/**
 * Sensor Updates authorizations routing middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.sensorUpdate.User.id !== req.user.id) {
      return res.send(401, 'User is not authorized');
    }
    next();
};
