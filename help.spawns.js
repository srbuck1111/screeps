var spawnHelper = {

    /** @param {Spawn} spawn **/
    run: function(spawn) {

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        console.log('Miners: ' + miners.length);
    
        if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 300) {
            if(harvesters.length < 2) {
                var newName = 'Harvester' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'harvester'}});
            } else if (upgraders.length < 3) {
                var newName = 'Upgrader' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'upgrader'}});
            } else if (builders.length < 1) {
                var newName = 'Builder' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
                    {memory: {role: 'builder'}});
            } else if (miners.length < 1) {
                spawnMiner(spawn.room.energyAvailable);
            }
        }
        
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
        }

    }

}
    
/** @param {Integer} energyAvailable **/
function spawnMiner(energyAvailable) {
    var newName = 'Miner' + Game.time;
    console.log('Spawning new miner: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
        {memory: {role: 'miner'}});
}

module.exports = spawnHelper;