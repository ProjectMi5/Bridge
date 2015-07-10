/**
 * Bridge - App
 *
 * Notes: it makes a difference which version of node-opcua 0.0.30 and 0.0.47 is used for the opcua-sever.
 * With newer version, a value gets always published, even when nothing changes. With older version, a keepalive
 * is send instead.
 * TODO: It is unclear now, how a beckhoff opcua server or other implementation react
 */
var config = require('./config.js');

var mqtt = require('mqtt');
GLOBAL.mqttClient = mqtt.connect(config.MQTTHost);
mqttClient.on('connect', function(){
  mqttClient.publish('mi5/module/1101/busy','ready')
  console.log('MQTT: connected to ', config.MQTTHost);
})

// NodeID with callback Function
var monitor = [ {
  //nodeId : 'MI5.Module2403Manual.Busy', // Beckhoff
  nodeId : 'ns=6;s=::AsGlobalPV:Module2201.Input.PositionInput',
  topic : 'mi5/module/2403/busy'
}];

// Start OPC UA connection, create a subscription and add all monitored items.
// var opc = require('./models/simpleOpcua').server('opc.tcp://192.168.42.42:4840'); // Beckhoff
var opc = require('./models/simpleOpcua').server('opc.tcp://192.168.42.14:4840'); // BnR
opc.initialize(function(err) {
  if (err) {
    // TODO: Try to reconnect
    console.log(err);
    return 0;
  } else {
    // Create a subscription
    opc.mi5Subscribe();

    // Add monitored items
    monitorArray(monitor);

  }
});

// Keep program alive
setInterval(function(){},1000);

/**
 * Loops over an array, and creates a monitored item and adds the callback handler
 *
 * @param items [array]
 */
function monitorArray(items){
  items.forEach(function(item) {
    console.log(item);
    var mI = opc.mi5Monitor(item.nodeId, item.topic);
    mI.on('changed', cbHandler);
	
	setInterval(function(){
	  console.log(mI);
	},1000);
  });
}

/**
 * Callback for a change on a monitored item
 *
 * @param data
 */
function cbHandler(data){
  //xx console.log(data);

  // this.itemToMonitor.nodeId.value //MI5.Module1101.....
  // this.itemToMonitor.topic // /mi5/module/1101/.... // beware this is kind of a hack with mi5Monitor
  // Publish the Data to mqtt, regarding nodeid and topic
  var topic = this.itemToMonitor.topic;
  var value = data.value.value;

  value = JSON.stringify(value);

  mqttClient.publish(topic,value);
  console.log('Publish: ',value,'to', topic);
}