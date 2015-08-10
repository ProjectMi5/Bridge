/**
 * Created by Thomas on 10.08.2015.
 */
var config = require('./../config.js');

/**
 MQTT Connection
 */
var mqtt = require('mqtt');
function initializeMQTT(){
  GLOBAL.mqttClient = mqtt.connect(config.MQTTHost);
  mqttClient.on('connect', function(){
    console.log('MQTT: connected to ', config.MQTTHost);
  });
}
module.exports.initializeMQTT = initializeMQTT;

/**
 * Initialize a serverObject
 *
 * @param serverObject
 */
function initializeOPCUA(serverObject){
  var opc = require('./simpleOpcua').server(serverObject.server);
  console.log('connecting to ', serverObject.name, serverObject.server);
  opc.initialize(function(err) {
    if (err) {
      // TODO: Try to reconnect
      console.log(err);
      return 0;
    } else {
      // Create a subscription
      opc.mi5Subscribe();

      // Add monitored items
      monitorArray(serverObject.nodes, opc);
    }
  });
}
module.exports.initializeOPCUA = initializeOPCUA;

/**
 * Loops over an array, and creates a monitored item and adds the callback handler
 *
 * @param items [array]
 */
function monitorArray(items, opcHandle){
  items.forEach(function(item) {
    console.log(item);
    var mI = opcHandle.mi5Monitor(item.nodeId, item.topic);

    // opc.mi5Monitor is async, wait one event loop
    setTimeout(function(){
      console.log('Monitor this nodeId: ',mI.itemToMonitor.nodeId.value);
      mI.on('changed', cbHandlerGeneric);
    },0);
  });
}

/**
 * Callback for a change on a monitored item
 *
 * @param data
 */
function cbHandlerGeneric(data){
  var topic = this.itemToMonitor.topic; // beware this is kind of a hack with opc.mi5Monitor()
  var value = data.value.value;

  if (value != this.itemToMonitor.previousValue){
    this.itemToMonitor.previousValue = value; //add a new variable to monitored item

    value = JSON.stringify(value);

    mqttClient.publish(topic,value);
    console.log('Publish: ',value,'to', topic);
  }
  else {
    console.log('No new value');
  }
}