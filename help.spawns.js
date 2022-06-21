var spawnHelper = {

    run: function() {

        // Get count of all creep roles
        const rolesMap = new Map();
        rolesMap.set('harvester', 0);
        rolesMap.set('upgrader', 0);
        rolesMap.set('builder', 0);
        for (var i in Game.creeps) {
            let creep = Game.creeps[i];
            let cRole = creep.memory.role;
            rolesMap.set(cRole, rolesMap.get(cRole)+1);
        }
        
        let roles =[...rolesMap.keys()];
        console.log(roles)

        for (var role in roles) {
            role = roles[role];
            console.log(role);
            if (rolesMap.get(role) < 3) {
                if (Game.spawns['Spawn1'].energy >= 300) {
                    let cName = role+''+(rolesMap.get(role)+1);
                    console.log('Spawning new '+role+': '+cName);
                    Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], cName, {role: role});
                } else {
                    console.log('not enough energy');
                }
            }
        }
    }

}

module.exports = spawnHelper;