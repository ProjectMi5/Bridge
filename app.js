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
var bridge = require('./models/bridge.js');

bridge.initializeMQTT();

/**
 * Item configuration
 */
// NodeIDs with callback Function
var watch = [
  {
    name: 'Mock',
    server: 'opc.tcp://localhost:4840/',
    nodes: [
      {
        nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Activated',
        topic : 'mi5/module/1101/skilloutput0/activated'
      }, {
        nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Busy',
        topic : 'mi5/module/1101/skilloutput0/busy'
      }, {
        nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Done',
        topic : 'mi5/module/1101/skilloutput0/done'
      }
    ]
  }
];

watch.forEach(function(serverObject){
  bridge.initializeOPCUA(serverObject);
});

// Keep program alive
setInterval(function(){},1000);