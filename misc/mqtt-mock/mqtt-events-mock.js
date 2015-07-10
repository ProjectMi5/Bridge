/**
 * Created by Thomas on 09.07.2015.
 */
var config = require('./../../config.js');

var events = require('events');

var mqtt = require('mqtt');
GLOBAL.mqttClient = mqtt.connect(config.MQTTHost);
mqttClient.on('connect', function(){
  mqttClient.publish('mi5/module/1101/busy','ready');
  console.log('Connected to MQTT: ',config.MQTTHost);

  //fakeLevel('mi5/module/2101/value/orange/level');
  //fakeLevel('mi5/module/2101/value/passion-fruit/level');
  //fakeLevel('mi5/module/2101/value/grenadine/level');
  //fakeLevel('mi5/module/2101/value/blue-curazao/level');
  //fakeLevel('mi5/module/2101/value/water/level');

  OrangeLevel.on('update', function(value){
    mqttClient.publish(this.topic.toString(), JSON.stringify(value));
    console.log('updated',this.topic,value);
  });

  function fakeLevel(topic){
    var level = 100 - Math.floor((Math.random() * 10) + 1)*10; //90 and 1
    setInterval(function(){
      level = level - Math.random()*2; //between 0 and 2;
      if(level <= 0){
        level = 100;
      }
      console.log('publish',topic, JSON.stringify(level));
      mqttClient.publish(topic, level);
    },1000);
  }

});

function opcuaValue(nodeId,topic){
  this.nodeId = nodeId;
  this.topic = topic;

  events.EventEmitter.call(this);

  this.update = function(value){
    this.emit('update', value);
  };
}
opcuaValue.prototype.__proto__ = events.EventEmitter.prototype;

var OrangeLevel = new opcuaValue('test','mi5/module/2101/value/orange/level');

setInterval(function(){
  OrangeLevel.update(30);
},1000);
