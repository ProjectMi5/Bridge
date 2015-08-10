/**
 * Created by Thomas on 10.08.2015.
 */
module.exports.nodes = [
  {
    name: 'Mock',
    server: 'opc.tcp://localhost:4840/',
    nodes: [
      {
        nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Activated',
        topic: 'mi5/module/1101/skilloutput0/activated'
      }, {
        nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Busy',
        topic: 'mi5/module/1101/skilloutput0/busy'
      }, {
        nodeId: 'MI5.Module1101.Output.SkillOutput.SkillOutput0.Done',
        topic: 'mi5/module/1101/skilloutput0/done'
      }
    ]
  }
];