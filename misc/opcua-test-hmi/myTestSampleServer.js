/**
 * Sample Server following the tutorial:
 * 
 * You can start the server by performing the following command in another file:
 *  nodeServer4334 = require("./myTestSampleServer.js").newOpcuaServer(4334);
 * 
 * http://node-opcua.github.io/create_a_server.html
 * @author Thomas Frei
 */
var _ = require('underscore');
    
exports.newOpcuaServer = function(portNumber){

  var opcua = require("node-opcua");

  var serverVars = new Array();
  var localVars = new Array();
  var server;
  
  server = new opcua.OPCUAServer({
    port: portNumber
  });

  // optional
  server.buildInfo.productName = "MySampleServer1";
  server.buildInfo.buildNumber = "7658";
  server.buildInfo.buildDate = new Date(2014,5,2);
  
  function construct_my_address_space(server) {
  
    // declare some folders
    server.engine.createFolder("RootFolder",{ browseName: "Module1101"});
    server.engine.createFolder("Module1101",{ browseName: "Output"});
    
    // Add Output Variables
    createOpcuaVariable( 'MI5.Module1101.Output.Dummy', 'Dummy', 'Output', 'Double', 1 );
    createOpcuaVariable( 'MI5.Module1101.Output.Name', 'Name', 'Output', 'String', 'OutputName' );
    createOpcuaVariable( 'MI5.Module1101.Output.ID', 'ID', 'Output', 'Double', 42123 );
    createOpcuaVariable( 'MI5.Module1101.Output.Idle', 'Idle', 'Output', 'Double', 1 );
    createOpcuaVariable( 'MI5.Module1101.Output.Connected', 'Connected', 'Output', 'Double', 1 );
    createOpcuaVariable( 'MI5.Module1101.Output.ConnectionTestOutput', 'ConnectionTestOutput', 'Output', 'Double', 3 );
    createOpcuaVariable( 'MI5.Module1101.Output.Error', 'Error', 'Output', 'Double', 0 );
    createOpcuaVariable( 'MI5.Module1101.Output.ErrorID', 'ErrorID', 'Output', 'Double', 0 );
    createOpcuaVariable( 'MI5.Module1101.Output.ErrorDescription', 'ErrorDescription', 'Output', 'String', '' );
    createOpcuaVariable( 'MI5.Module1101.Output.CurrentTaskDescription', 'CurrentTaskDescription', 'Output', 'String', '' );
    createOpcuaVariable( 'MI5.Module1101.Output.PositionSensor', 'PositionSensor', 'Output', 'Double', 0 );
    
    // Add SkillOutput and SkillOutput Folders
    server.engine.createFolder("Output",{ browseName: "SkillOutput"});
    server.engine.createFolder("SkillOutput",{ browseName: "SkillOutput0"});
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Dummy', 'Dummy', 'SkillOutput0', 'Double', 1 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ID', 'ID', 'SkillOutput0', 'Double', 1337 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Name', 'Name', 'SkillOutput0', 'String', 'TestSkill' );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Activated', 'Activated', 'SkillOutput0', 'Double', 1 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Ready', 'Ready', 'SkillOutput0', 'Double', 1 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Busy', 'Busy', 'SkillOutput0', 'Double', 0 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Done', 'Done', 'SkillOutput0', 'Double', 0 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Error', 'Error', 'SkillOutput0', 'Double', 0 );
    
    // ParameterOutput
    server.engine.createFolder("SkillOutput0",{ browseName: "ParameterOutput"});
    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput0"});
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Dummy', 'Dummy', 'ParameterOutput0', 'Double', 0 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.ID', 'ID', 'ParameterOutput0', 'Double', 31337 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Name', 'Name', 'ParameterOutput0', 'String', 'TestGeschwindigkeit' );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Unit', 'Unit', 'ParameterOutput0', 'String', 'm/s');
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Required', 'Required', 'ParameterOutput0', 'Double', 1 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Default', 'Default', 'ParameterOutput0', 'Double', 40 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.MinValue', 'MinValue', 'ParameterOutput0', 'Double', 0 );
    createOpcuaVariable( 'MI5.Module1101.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.MaxValue', 'MaxValue', 'ParameterOutput0', 'Double', 100 );

    // Add Second SkillOutput and SkillOutput Folders
    server.engine.createFolder("SkillOutput",{ browseName: "SkillOutput1"});
    var skillOutput = 'MI5.Module1101.Output.SkillOutput.SkillOutput1';
    createMI5Variable(skillOutput, 'Dummy', 0 );
    createMI5Variable(skillOutput, 'ID', 74821 );
    createMI5Variable(skillOutput, 'Name', 'DummySkill' , 'String');
    createMI5Variable(skillOutput, 'Activated', 0 );
    createMI5Variable(skillOutput, 'Ready', 1 );
    createMI5Variable(skillOutput, 'Busy', 0 );
    createMI5Variable(skillOutput, 'Done', 0 );
    createMI5Variable(skillOutput, 'Error', 0 );
    
    server.engine.createFolder("SkillOutput1",{ browseName: "ParameterOutput"});
    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput0"});
    var parameterOutput = 'MI5.Module1101.Output.SkillOutput.SkillOutput1.ParameterOutput.ParameterOutput0';
    createMI5Variable(parameterOutput, 'Dummy', 0);
    createMI5Variable(parameterOutput, 'ID', 1);
    createMI5Variable(parameterOutput, 'Name', 'Erster', 'String');
    createMI5Variable(parameterOutput, 'Unit', 'm/s', 'String');
    createMI5Variable(parameterOutput, 'Required', 1);
    createMI5Variable(parameterOutput, 'Default', 50);
    createMI5Variable(parameterOutput, 'MinValue', 0);
    createMI5Variable(parameterOutput, 'MaxValue', 100);
    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput1"});
    var parameterOutput = 'MI5.Module1101.Output.SkillOutput.SkillOutput1.ParameterOutput.ParameterOutput1';
    createMI5Variable(parameterOutput, 'Dummy', 0);
    createMI5Variable(parameterOutput, 'ID', 2);
    createMI5Variable(parameterOutput, 'Name', 'Zweiter', 'String');
    createMI5Variable(parameterOutput, 'Unit', 'm/s', 'String');
    createMI5Variable(parameterOutput, 'Required', 1);
    createMI5Variable(parameterOutput, 'Default', 50);
    createMI5Variable(parameterOutput, 'MinValue', 0);
    createMI5Variable(parameterOutput, 'MaxValue', 100);
    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput2"});
    var parameterOutput = 'MI5.Module1101.Output.SkillOutput.SkillOutput1.ParameterOutput.ParameterOutput2';
    createMI5Variable(parameterOutput, 'Dummy', 0);
    createMI5Variable(parameterOutput, 'ID', 3);
    createMI5Variable(parameterOutput, 'Name', 'Dritter', 'String');
    createMI5Variable(parameterOutput, 'Unit', 'm/s', 'String');
    createMI5Variable(parameterOutput, 'Required', 1);
    createMI5Variable(parameterOutput, 'Default', 10);
    createMI5Variable(parameterOutput, 'MinValue', 5);
    createMI5Variable(parameterOutput, 'MaxValue', 30);

    server.engine.createFolder("RootFolder",{ browseName: "Recipe"});
    server.engine.createFolder("Recipe",{ browseName: "Recipe0"});    
    var recipe = 'MI5.Recipe.Recipe0';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'ID', 1001);
    createMI5Variable(recipe, 'Name', 'Cuba Libre', 'String');
    createMI5Variable(recipe, 'Description', 'Free Cuba, and enjoy this delicious drink.', 'String');
    server.engine.createFolder("Recipe0",{ browseName: "UserParameter"});
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter0"});  
    var recipe = 'MI5.Recipe.Recipe0.UserParameter.UserParameter0';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'Name', 'Rum', 'String');
    createMI5Variable(recipe, 'Description', 'Original Cuban Rum', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 20);
    createMI5Variable(recipe, 'MinValue', 0);
    createMI5Variable(recipe, 'MaxValue', 50);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter1"});  
    var recipe = 'MI5.Recipe.Recipe0.UserParameter.UserParameter1';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'Name', 'Cola', 'String');
    createMI5Variable(recipe, 'Description', 'Coca Cola', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 200);
    createMI5Variable(recipe, 'MinValue', 100);
    createMI5Variable(recipe, 'MaxValue', 300);
    
    server.engine.createFolder("Recipe",{ browseName: "Recipe1"});    
    var recipe = 'MI5.Recipe.Recipe1';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'ID', 1002);
    createMI5Variable(recipe, 'Name', 'Virgin Pina Colada', 'String');
    createMI5Variable(recipe, 'Description', 'This delicious pina colada is made out of:', 'String');
    server.engine.createFolder("Recipe1",{ browseName: "UserParameter"});
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter0"});  
    var recipe = 'MI5.Recipe.Recipe1.UserParameter.UserParameter0';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'Name', 'Pineapple', 'String');
    createMI5Variable(recipe, 'Description', 'Original Cherry-Water', 'String');
    createMI5Variable(recipe, 'Unit', 'm/s', 'String');
    createMI5Variable(recipe, 'Default', 160);
    createMI5Variable(recipe, 'MinValue', 120);
    createMI5Variable(recipe, 'MaxValue', 200);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter1"});  
    var recipe = 'MI5.Recipe.Recipe1.UserParameter.UserParameter1';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'Name', 'Cream', 'String');
    createMI5Variable(recipe, 'Description', 'also known as "Sahne"', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 20);
    createMI5Variable(recipe, 'MinValue', 10);
    createMI5Variable(recipe, 'MaxValue', 30);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter2"});  
    var recipe = 'MI5.Recipe.Recipe1.UserParameter.UserParameter2';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'Name', 'Cream of Coconut', 'String');
    createMI5Variable(recipe, 'Description', 'Cream of Cocunt: Coco Tara', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 40);
    createMI5Variable(recipe, 'MinValue', 20);
    createMI5Variable(recipe, 'MaxValue', 60);
     

    server.engine.createFolder("RootFolder",{ browseName: "Queue"});
    server.engine.createFolder("Queue",{ browseName: "Queue0"});
    var recipe = 'MI5.Queue.Queue0';
    createMI5Variable(recipe, 'Pending', 0);
    createMI5Variable(recipe, 'RecipeID', 0);
    createMI5Variable(recipe, 'TaskID', 0);
    createMI5Variable(recipe, 'Name', '', 'String');
    createMI5Variable(recipe, 'Description', '', 'String');
    server.engine.createFolder("Queue0",{ browseName: "UserParameter"});
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter0"});
    var recipe = 'MI5.Queue.Queue0.UserParameter.UserParameter0';
    createMI5Variable(recipe, 'Value', 0);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter1"});
    var recipe = 'MI5.Queue.Queue0.UserParameter.UserParameter1';
    createMI5Variable(recipe, 'Value', 0);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter2"});
    var recipe = 'MI5.Queue.Queue0.UserParameter.UserParameter2';
    createMI5Variable(recipe, 'Value', 0);
    
  }
  
  function post_initialize() {
    console.log("initialized");
    
    construct_my_address_space(server);
    
    server.start(function() {
      console.log("Server is now listening ... ( press CTRL+C to stop)");
      console.log("port ", server.endpoints[0].port);
      
      var endpointUrl = server.endpoints[0].endpointDescription().endpointUrl;
      console.log(" the primary server endpoint url is ", endpointUrl );
    
    });
  }
  
  server.initialize(post_initialize);
  
  
  


  /*
   * Below you find Functions for easy handling
   */
  
  /**
   * Generate 15 digit random string
   * used for 'variable variable names'
   * 
   * @returns {String}
   */
  function makeServerVariable()
  {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
      for( var i=0; i < 15; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
  
      return text;
  }
  
  /**
   * Explode a NodeId (String to Array)
   * 
   * @returns [array]
   */
  function explodeNodeId(nodeId){
    return nodeId.split('.');
  }
  
  function createMI5Variable(baseNodeId, variableName, defaultValue, variableType){
    var folder = _.last(explodeNodeId(baseNodeId));
    var desiredNodeId = baseNodeId+'.'+variableName;
    var displayName = variableName;
    
    defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : 0;
    variableType = typeof variableType !== 'undefined' ? variableType : 'Double';
    
    //console.log(desiredNodeId, displayName, folder, variableType, defaultValue);
    createOpcuaVariable(desiredNodeId, displayName, folder, variableType, defaultValue);
  }
  
  /**
   * Create an OPC UA Variable in the Test Server
   * 
   * @param DesiredNodeId
   * @param DisplayName
   * @param Folder
   * @param VariableType
   * @param DefaultValue
   * @returns {String} name of server-object that stores the value (server.NewObject)
   */
  function createOpcuaVariable(DesiredNodeId, DisplayName, Folder, VariableType, DefaultValue) {
    /*
     * Generate Default values for the input variables
     */
    DesiredNodeId = typeof DesiredNodeId !== 'undefined' ? ( 'ns=4;s=' + DesiredNodeId ) : '';
    VariableType = typeof VariableType !== 'undefined' ? VariableType : 'String';
    
    var currentElement = localVars.length;
    localVars[currentElement] = DefaultValue;
    
    randomString  = makeServerVariable();
    server[randomString] = server.engine.addVariableInFolder(Folder,{
      nodeId: DesiredNodeId, // some opaque NodeId in namespace 4 (optional) "ns=4s=GVL.OPCModule.Output.Skill;
      browseName: DisplayName,
      dataType: VariableType,    
      value: {
          get: function () {
              return new opcua.Variant({dataType: opcua.DataType[VariableType], value: localVars[currentElement] });
          },
          set: function (variant) {
            if ( VariableType == 'Double') {
              localVars[currentElement] = parseFloat(variant.value);
            } else {
              localVars[currentElement] = variant.value;
            }
            return opcua.StatusCodes.Good;
          }
      }
    });
    console.log('Variable ', DisplayName, ' added');
    return randomString;
  }
  
  function doubleOpcua(DefaultValue, Description) {
    var currentElement = localVars.length;
    localVars[currentElement] = DefaultValue;
    var newServerVar = server.engine.addVariableInFolder("MyDevice",{
      //nodeId: "ns=4;b=1020FFAA", // some opaque NodeId in namespace 4 (optional)
      browseName: Description,
      dataType: "Double",    
      value: {
          get: function () {
              return new opcua.Variant({dataType: opcua.DataType.Double, value: localVars[currentElement] });
          },
          set: function (variant) {
            localVars[currentElement] = parseFloat(variant.value);
            return opcua.StatusCodes.Good;
          }
      }
    });
    console.log('Variable ', Description, ' added');
    return newServerVar;
  };
  function stringOpcua(DefaultValue, Description, desiredNodeId) {
    desiredNodeId = typeof desiredNodeId !== 'undefined' ? ( 'ns=4;s=' + desiredNodeId ) : '';
    randomString  = makeServerVariable();
    
    var currentElement = localVars.length;
    localVars[currentElement] = DefaultValue;
    server[randomString] = server.engine.addVariableInFolder("MyDevice",{
      nodeId: desiredNodeId, // some opaque NodeId in namespace 4 (optional) "ns=4s=GVL.OPCModule.Output.Skill;
      browseName: Description,
      dataType: "String",    
      value: {
          get: function () {
              return new opcua.Variant({dataType: opcua.DataType.String, value: localVars[currentElement] });
          },
          set: function (variant) {
            localVars[currentElement] = variant.value;
            return opcua.StatusCodes.Good;
          }
      }
    });
    console.log('Variable ', Description, ' added');
    return randomString;
  };
  
  function doubleOpcuaVariable(variable, Description) {
    var newServerNodeVariable = server.engine.addVariableInFolder("MyDevice",{
      //nodeId: "ns=4;b=1020FFAA", // some opaque NodeId in namespace 4 (optional)
      browseName: Description,
      dataType: "Double",    
      value: {
          get: function () {
              return new opcua.Variant({dataType: opcua.DataType.Double, value: variable });
          },
          set: function (variant) {
            variable = parseFloat(variant.value);
            return opcua.StatusCodes.Good;
          }
      }
    });
    console.log('Variable ', Description, ' added');
    return newServerNodeVariable;
  };
  function stringOpcuaVariable(variable, Description) {
    var newServerNodeVariable = server.engine.addVariableInFolder("MyDevice",{
      //nodeId: "ns=4;b=1020FFAA", // some opaque NodeId in namespace 4 (optional)
      browseName: Description,
      dataType: "String",    
      value: {
          get: function () {
              return new opcua.Variant({dataType: opcua.DataType.String, value: variable });
          },
          set: function (variant) {
            variable = variant.value; // comes in as a string
            return opcua.StatusCodes.Good;
          }
      }
    });
    console.log('Variable ', Description, ' added');
    return newServerNodeVariable;
  };
  
  
  return server;
}; // very first export of this file