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
    
OPCUAServer(4840); // Call the OPC UA Server

function OPCUAServer(portNumber){
  var module = 'Module1101';

  var opcua = require("node-opcua");

  var serverVars = new Array();
  var localVars = new Array();
  var server;
  
  server = new opcua.OPCUAServer({
    port: portNumber
  });

  // optional
  server.buildInfo.productName = "InputModule";
  server.buildInfo.buildNumber = "7658";
  server.buildInfo.buildDate = new Date(2014,5,2);
  
  function construct_my_address_space(server) {
  
    // declare some folders
    server.engine.createFolder("RootFolder",{ browseName: module});    
    server.engine.createFolder(module,{ browseName: "Output"});
    
    // Add Output Variables
    createOpcuaVariable( 'MI5.'+module+'.Output.Dummy', 'Dummy', 'Output', 'Double', 1 );
    createOpcuaVariable( 'MI5.'+module+'.Output.Name', 'Name', 'Output', 'String', 'OutputName' );
    createOpcuaVariable( 'MI5.'+module+'.Output.ID', 'ID', 'Output', 'Double', 42123 );
    createOpcuaVariable( 'MI5.'+module+'.Output.Idle', 'Idle', 'Output', 'Double', 1 );
    createOpcuaVariable( 'MI5.'+module+'.Output.Connected', 'Connected', 'Output', 'Double', 1 );
    createOpcuaVariable( 'MI5.'+module+'.Output.ConnectionTestOutput', 'ConnectionTestOutput', 'Output', 'Double', 3 );
    createOpcuaVariable( 'MI5.'+module+'.Output.Error', 'Error', 'Output', 'Double', 0 );
    createOpcuaVariable( 'MI5.'+module+'.Output.ErrorID', 'ErrorID', 'Output', 'Double', 0 );
    createOpcuaVariable( 'MI5.'+module+'.Output.ErrorDescription', 'ErrorDescription', 'Output', 'String', '' );
    createOpcuaVariable( 'MI5.'+module+'.Output.CurrentTaskDescription', 'CurrentTaskDescription', 'Output', 'String', '' );
    createOpcuaVariable( 'MI5.'+module+'.Output.PositionSensor', 'PositionSensor', 'Output', 'Double', 0 );
    createOpcuaVariable( 'MI5.'+module+'.Output.PositionOutput', 'PositionOutput', 'Output', 'Double', 0 );
    
    // Add SkillOutput and SkillOutput Folders
    server.engine.createFolder("Output",{ browseName: "SkillOutput"});
    server.engine.createFolder("SkillOutput",{ browseName: "SkillOutput0"});
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.Dummy', 'Dummy', 'SkillOutput0', 'Double', 1 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ID', 'ID', 'SkillOutput0', 'Double', 1337 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.Name', 'Name', 'SkillOutput0', 'String', 'TestSkill' );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.Activated', 'Activated', 'SkillOutput0', 'Double', 1 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.Ready', 'Ready', 'SkillOutput0', 'Boolean', true );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.Busy', 'Busy', 'SkillOutput0', 'Boolean', false );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.Done', 'Done', 'SkillOutput0', 'Boolean', false );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.Error', 'Error', 'SkillOutput0', 'Boolean', false );
    
    // ParameterOutput
    server.engine.createFolder("SkillOutput0",{ browseName: "ParameterOutput"});
    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput0"});
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Dummy', 'Dummy', 'ParameterOutput0', 'Double', 0 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.ID', 'ID', 'ParameterOutput0', 'Double', 31337 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Name', 'Name', 'ParameterOutput0', 'String', 'TestGeschwindigkeit' );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Unit', 'Unit', 'ParameterOutput0', 'String', 'm/s');
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Required', 'Required', 'ParameterOutput0', 'Double', 1 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.Default', 'Default', 'ParameterOutput0', 'Double', 40 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.MinValue', 'MinValue', 'ParameterOutput0', 'Double', 0 );
    createOpcuaVariable( 'MI5.'+module+'.Output.SkillOutput.SkillOutput0.ParameterOutput.ParameterOutput0.MaxValue', 'MaxValue', 'ParameterOutput0', 'Double', 100 );

    // Add Second SkillOutput and SkillOutput Folders
//    server.engine.createFolder("SkillOutput",{ browseName: "SkillOutput1"});
//    var skillOutput = 'MI5.'+module+'.Output.SkillOutput.SkillOutput1';
//    createMI5Variable(skillOutput, 'Dummy', 0 );
//    createMI5Variable(skillOutput, 'ID', 74821 );
//    createMI5Variable(skillOutput, 'Name', 'DummySkill' , 'String');
//    createMI5Variable(skillOutput, 'Activated', 0 );
//    createMI5Variable(skillOutput, 'Ready', 1 );
//    createMI5Variable(skillOutput, 'Busy', 0 );
//    createMI5Variable(skillOutput, 'Done', 0 );
//    createMI5Variable(skillOutput, 'Error', 0 );
//    
//    server.engine.createFolder("SkillOutput1",{ browseName: "ParameterOutput"});
//    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput0"});
//    var parameterOutput = 'MI5.'+module+'.Output.SkillOutput.SkillOutput1.ParameterOutput.ParameterOutput0';
//    createMI5Variable(parameterOutput, 'Dummy', 0);
//    createMI5Variable(parameterOutput, 'ID', 1);
//    createMI5Variable(parameterOutput, 'Name', 'Erster', 'String');
//    createMI5Variable(parameterOutput, 'Unit', 'm/s', 'String');
//    createMI5Variable(parameterOutput, 'Required', 1);
//    createMI5Variable(parameterOutput, 'Default', 50);
//    createMI5Variable(parameterOutput, 'MinValue', 0);
//    createMI5Variable(parameterOutput, 'MaxValue', 100);
//    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput1"});
//    var parameterOutput = 'MI5.'+module+'.Output.SkillOutput.SkillOutput1.ParameterOutput.ParameterOutput1';
//    createMI5Variable(parameterOutput, 'Dummy', 0);
//    createMI5Variable(parameterOutput, 'ID', 2);
//    createMI5Variable(parameterOutput, 'Name', 'Zweiter', 'String');
//    createMI5Variable(parameterOutput, 'Unit', 'm/s', 'String');
//    createMI5Variable(parameterOutput, 'Required', 1);
//    createMI5Variable(parameterOutput, 'Default', 50);
//    createMI5Variable(parameterOutput, 'MinValue', 0);
//    createMI5Variable(parameterOutput, 'MaxValue', 100);
//    server.engine.createFolder("ParameterOutput",{ browseName: "ParameterOutput2"});
//    var parameterOutput = 'MI5.'+module+'.Output.SkillOutput.SkillOutput1.ParameterOutput.ParameterOutput2';
//    createMI5Variable(parameterOutput, 'Dummy', 0);
//    createMI5Variable(parameterOutput, 'ID', 3);
//    createMI5Variable(parameterOutput, 'Name', 'Dritter', 'String');
//    createMI5Variable(parameterOutput, 'Unit', 'm/s', 'String');
//    createMI5Variable(parameterOutput, 'Required', 1);
//    createMI5Variable(parameterOutput, 'Default', 10);
//    createMI5Variable(parameterOutput, 'MinValue', 5);
//    createMI5Variable(parameterOutput, 'MaxValue', 30);
    

    // Add Input
    server.engine.createFolder(module,{ browseName: "Input"});
    var baseNodeId = 'MI5.'+module+'.Input';
    createMI5Variable(baseNodeId, 'ConnectionTestInput', false, 'Boolean');
    createMI5Variable(baseNodeId, 'Mode', 0, 'Int16');
    createMI5Variable(baseNodeId, 'EmergencyStop', false, 'Boolean');
    createMI5Variable(baseNodeId, 'Position', 0, 'Double');
    
    server.engine.createFolder("Input",{ browseName: "SkillInput"});
    server.engine.createFolder("SkillInput",{ browseName: "SkillInput0"});
    var baseNodeId = 'MI5.'+module+'.Input.SkillInput.SkillInput0';
    createMI5Variable(baseNodeId, 'Execute', false, 'Boolean');

    server.engine.createFolder("SkillInput0",{ browseName: "ParameterInput"});
    server.engine.createFolder("ParameterInput",{ browseName: "ParameterInput0"});
    var baseNodeId = 'MI5.'+module+'.Input.SkillInput.SkillInput0.ParameterInput.ParameterInput0';
    createMI5Variable(baseNodeId, 'Value', 0, 'Double');
    createMI5Variable(baseNodeId, 'StringValue', '', 'String');
    
    // Create Service Skills
    var parameterOutput = 'MI5.'+module+'';
    createMI5Variable(parameterOutput, 'ServiceSkillCount', 2);
    server.engine.createFolder(module,{ browseName: "ServiceSkill"});
    server.engine.createFolder("ServiceSkill",{ browseName: "ServiceSkill0"});
    var parameterOutput = 'MI5.'+module+'.ServiceSkill.ServiceSkill0';
    createMI5Variable(parameterOutput, 'ID', 1, 'Int16');
    createMI5Variable(parameterOutput, 'Name', 'Reset Module', 'String');
    createMI5Variable(parameterOutput, 'Execute', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Requested', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Abort', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Busy', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Done', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Error', false, 'Boolean');
    createMI5Variable(parameterOutput, 'ParameterCount', 0, 'Int16');
    
    server.engine.createFolder("ServiceSkill",{ browseName: "ServiceSkill1"});
    var parameterOutput = 'MI5.'+module+'.ServiceSkill.ServiceSkill1';
    createMI5Variable(parameterOutput, 'ID', 1, 'Int16');
    createMI5Variable(parameterOutput, 'Name', 'Set Execute', 'String');
    createMI5Variable(parameterOutput, 'Execute', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Requested', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Abort', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Busy', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Done', false, 'Boolean');
    createMI5Variable(parameterOutput, 'Error', false, 'Boolean');
    createMI5Variable(parameterOutput, 'ParameterCount', 1, 'Int16');
    server.engine.createFolder("ServiceSkill1",{ browseName: "Parameter"});
    server.engine.createFolder("Parameter",{ browseName: "Parameter0"});
    var parameterOutput = parameterOutput+'.Parameter.Parameter0';
    createMI5Variable(parameterOutput, 'ID', 1, 'Int16');
    createMI5Variable(parameterOutput, 'Name', 'Execute', 'String');
    createMI5Variable(parameterOutput, 'Unit', 'Boolean', 'String');
    createMI5Variable(parameterOutput, 'Step', '', 'String');
    createMI5Variable(parameterOutput, 'Default', 'false', 'String');
    createMI5Variable(parameterOutput, 'MinValue', '', 'String');
    createMI5Variable(parameterOutput, 'MaxValue', '', 'String');
    createMI5Variable(parameterOutput, 'Value', '', 'String');
    
    
  }
  
  function post_initialize() {
    console.log("initialized");
    
    construct_my_address_space(server);
    
    server.start(function() {
      console.log("Server is now listening ... ( press CTRL+C to stop)");
      console.log("port ", server.endpoints[0].port);

    
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
    //console.log('Variable ', DisplayName, ' added');
    return randomString;
  } 
  
  return server;
}; // very first export of this file