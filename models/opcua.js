/**
 * OPC UA Model
 *
 * @author Thomas Frei
 * @date 2015-07-08
 */

var nodeopcua = require("node-opcua");
var util = require("util");
var events = require("events");
var async = require("async");

/*
 * OpcUA object to handle scope-issues of nested cb calls
 */
var opcua;

/**
 * Initialize class
 * @returns {*}
 */
mi5cloud = function() {

};
exports.mi5cloud = new mi5cloud();
