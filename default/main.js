var roleHarvester = require('role.harvester');
var spawnHelper = require('help.spawns');

module.exports.loop = function () {

    spawnHelper.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}