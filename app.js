/**
 * Bridge - App
 *
 * Notes: it makes a difference which version of node-opcua 0.0.30 and 0.0.47 is used for the opcua-sever.
 * With newer version, a value gets always published, even when nothing changes. With older version, a keepalive
 * is send instead.
 * TODO: It is unclear now, how a beckhoff opcua server or other implementation react
 */
var config = require('./config.js');

var opc = require('./models/simpleOpcua').server(config.Cocktail);
//var opc = require('./models/simpleOpcua').server('opc.tcp://h3l1x:1234');

opc.initialize(function(err) {
  if (err) {
    console.log(err);
    return 0;
  } else {
    opc.mi5Subscribe();


    // NodeID with callback Function
    var monitor = [ {
      //nodeId : 'ns=4;s=myvariabl2',
      nodeId : 'ns=4;s=MI5.Module11ge01.Output.SkillOutput.SkillOutput0.Ready',
      callback : onNameChange
    }];

    assert(_.isArray(monitor));

    monitor.forEach(function(item) {
      console.log(item);
      var mI = opc.mi5Monitor(item.nodeId);
      mI.on('changed', item.callback);
    });


  }
});


function onNameChange(data){
  console.log('Monitor item has changed somehow - data:');
  console.log(data.value.value);
}



// Just so that it keeps running
setInterval(function(){},5000);