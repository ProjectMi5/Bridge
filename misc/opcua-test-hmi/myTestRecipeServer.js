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
    
function newOpcuaServer(portNumber){

  var opcua = require("node-opcua");

  var serverVars = new Array();
  var localVars = new Array();
  var server;
  
  server = new opcua.OPCUAServer({
    port: portNumber
  });

  // optional
  server.buildInfo.productName = "RecipeServer";
  server.buildInfo.buildNumber = "7658";
  server.buildInfo.buildDate = new Date(2014,5,2);
  
  function construct_my_address_space(server) {
  
    // declare some folders
    server.engine.createFolder("RootFolder",{ browseName: "Recipe"});
    server.engine.createFolder("Recipe",{ browseName: "Recipe[0]"});
    var recipe = 'MI5.Recipe[0]';
    createMI5Variable(recipe, 'Dummy', 0, 'Int16');
    createMI5Variable(recipe, 'ID', 1001, 'Int16');
    createMI5Variable(recipe, 'Name', 'Cuba Libre', 'String');
    createMI5Variable(recipe, 'Description', 'Free Cuba, and enjoy this delicious drink.', 'String');
    server.engine.createFolder("Recipe[0]",{ browseName: "UserParameter"});
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter[0]"});  
    var recipe = 'MI5.Recipe[0].UserParameter[0]';
    createMI5Variable(recipe, 'Dummy', 0, 'Int16');
    createMI5Variable(recipe, 'Name', 'Rum', 'String');
    createMI5Variable(recipe, 'Description', 'Original Cuban Rum', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 20);
    createMI5Variable(recipe, 'MinValue', 0);
    createMI5Variable(recipe, 'MaxValue', 50);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter[1]"});  
    var recipe = 'MI5.Recipe[0].UserParameter[1]';
    createMI5Variable(recipe, 'Dummy', 0, 'Int16');
    createMI5Variable(recipe, 'Name', 'Cola', 'String');
    createMI5Variable(recipe, 'Description', 'Coca Cola', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 200);
    createMI5Variable(recipe, 'MinValue', 100);
    createMI5Variable(recipe, 'MaxValue', 300);

    server.engine.createFolder("Recipe",{ browseName: "Recipe[1]"});
    var recipe = 'MI5.Recipe[1]';
    createMI5Variable(recipe, 'Dummy', 0, 'Int16');
    createMI5Variable(recipe, 'ID', 1002, 'Int16');
    createMI5Variable(recipe, 'Name', 'Virgin Pina Colada', 'String');
    createMI5Variable(recipe, 'Description', 'This delicious pina colada is made out of:', 'String');
    server.engine.createFolder("Recipe[1]",{ browseName: "UserParameter"});
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter[0]"});  
    var recipe = 'MI5.Recipe[1].UserParameter[0]';
    createMI5Variable(recipe, 'Dummy', 0, 'Int16');
    createMI5Variable(recipe, 'Name', 'Pineapple', 'String');
    createMI5Variable(recipe, 'Description', 'Original Cherry-Water', 'String');
    createMI5Variable(recipe, 'Unit', 'm/s', 'String');
    createMI5Variable(recipe, 'Default', 160);
    createMI5Variable(recipe, 'MinValue', 120);
    createMI5Variable(recipe, 'MaxValue', 200);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter[1]"});  
    var recipe = 'MI5.Recipe[1].UserParameter[1]';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'Name', 'Cream', 'String');
    createMI5Variable(recipe, 'Description', 'also known as "Sahne"', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 20);
    createMI5Variable(recipe, 'MinValue', 10);
    createMI5Variable(recipe, 'MaxValue', 30);
    server.engine.createFolder("UserParameter",{ browseName: "UserParameter[2]"});  
    var recipe = 'MI5.Recipe[1].UserParameter[2]';
    createMI5Variable(recipe, 'Dummy', 0);
    createMI5Variable(recipe, 'Name', 'Cream of Coconut', 'String');
    createMI5Variable(recipe, 'Description', 'Cream of Cocunt: Coco Tara', 'String');
    createMI5Variable(recipe, 'Unit', 'ml', 'String');
    createMI5Variable(recipe, 'Default', 40);
    createMI5Variable(recipe, 'MinValue', 20);
    createMI5Variable(recipe, 'MaxValue', 60);
//     
//
//    server.engine.createFolder("RootFolder",{ browseName: "Queue"});
//    server.engine.createFolder("Queue",{ browseName: "Queue0"});
//    var recipe = 'MI5.Queue.Queue0';
//    createMI5Variable(recipe, 'Pending', 0);
//    createMI5Variable(recipe, 'RecipeID', 0);
//    createMI5Variable(recipe, 'TaskID', 0);
//    createMI5Variable(recipe, 'Name', '', 'String');
//    createMI5Variable(recipe, 'Description', '', 'String');
//    server.engine.createFolder("Queue0",{ browseName: "UserParameter"});
//    server.engine.createFolder("UserParameter",{ browseName: "UserParameter0"});
//    var recipe = 'MI5.Queue.Queue0.UserParameter.UserParameter0';
//    createMI5Variable(recipe, 'Value', 0);
//    server.engine.createFolder("UserParameter",{ browseName: "UserParameter1"});
//    var recipe = 'MI5.Queue.Queue0.UserParameter.UserParameter1';
//    createMI5Variable(recipe, 'Value', 0);
//    server.engine.createFolder("UserParameter",{ browseName: "UserParameter2"});
//    var recipe = 'MI5.Queue.Queue0.UserParameter.UserParameter2';
//    createMI5Variable(recipe, 'Value', 0);
    
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
} // very first export of this file
exports.newOpcuaServer = newOpcuaServer;

newOpcuaServer(4334);


