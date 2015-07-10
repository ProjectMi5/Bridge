/**
 * Created by Thomas on 09.07.2015.
 */
var config = require('./../../config.js');

var events = require('events');

var mqtt = require('mqtt');
GLOBAL.mqttClient = mqtt.connect(config.MQTTHost);
mqttClient.on('connect', function(){
  mqttClient.publish('mi5/module/1101/busy','ready')
  console.log('Connected to MQTT: ',config.MQTTHost);

  fakeLevel('mi5/module/2101/value/orange/level');
  fakeLevel('mi5/module/2101/value/passion-fruit/level');
  fakeLevel('mi5/module/2101/value/grenadine/level');
  fakeLevel('mi5/module/2101/value/blue-curazao/level');
  fakeLevel('mi5/module/2101/value/water/level');

  fakePosition('mi5/module/1101/mover/1/position');
  fakePosition('mi5/module/1101/mover/2/position');
  fakePosition('mi5/module/1101/mover/3/position');



  function fakeLevel(topic){
    var level = 100 - Math.floor((Math.random() * 10) + 1)*10; //90 and 1
    setInterval(function(){
      level = level - Math.random()*2; //between 0 and 2;
      if(level <= 0){
        level = 100;
      }
      
      console.log('publish',topic, level);
      mqttClient.publish(topic, JSON.stringify(level));
    },1000);
  }

  function fakePosition(topic){
    var level = 1500 - Math.floor((Math.random() * 100) + 1); //1499 and 1399
    setInterval(function(){
      level = level + Math.random()*4; //between 0 and 2;
      if(level <= 0){
        level = 1500;
      }
      
      console.log('publish',topic, level);
      mqttClient.publish(topic, JSON.stringify(level));
    },500);
  }
});
