/**
 * Bridge - App
 *
 * Notes: it makes a difference which version of node-opcua 0.0.30 and 0.0.47 is used for the opcua-sever.
 * With newer version, a value gets always published, even when nothing changes. With older version, a keepalive
 * is send instead.
 * TODO: It is unclear now, how a beckhoff opcua server or other implementation react
 *
 * Test with node-opcua server: js\HMI\misc>node OPCUAServer_InputModule.js
 */
var config = require('./config.js');

/**
 MQTT Connection
 */
var mqtt = require('mqtt');
GLOBAL.mqttClient = mqtt.connect(config.MQTTHost);
mqttClient.on('connect', function(){
  mqttClient.publish('mi5/module/1101/busy','ready')
  console.log('MQTT: connected to ', config.MQTTHost);
})

/**
 * Items per Server
 */
// NodeIDs with callback Function
var monitor = [ {
  //nodeId : 'MI5.Module2403.Manual.Busy', // Beckhoff
  //nodeId : 'ns=6;s=::AsGlobalPV:Module2201.Input.PositionInput',
  nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Activated',
  topic : 'mi5/module/1101/skilloutput0/activated'
}, {
  nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Busy',
  topic : 'mi5/module/1101/skilloutput0/busy'
}, {
  nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Done',
  topic : 'mi5/module/1101/skilloutput0/done'
}];

/**
 * OPC UA Connection
 */
var opc = require('./models/simpleOpcua').server(config.OPCUAMockup);
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