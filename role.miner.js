var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //Decides whether the creep should be mining or not
	    if(!creep.memory.mining && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.mining = true;
            creep.say('⛏ mine');
	    }
	    if(creep.memory.mining && creep.store.getFreeCapacity() == 0) {
	        creep.memory.mining = false;
	        creep.say('📦 store');
	    }

        //If mining check if near a node and if so mine it.
	    if(creep.memory.mining) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

        //If finished mining deposit into container
        else {
            //Check for a container directly below itself to deposit into
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                            creep.pos.getRangeTo(structure) <= 1;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            //If no container is found, place one or continue constructing it
            else {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            creep.pos.getRangeTo(structure) <= 1;
                    }
                });
                if (targets.length > 0) {
                    creep.build(targets[0])
                } else {
                    creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
                }
            }
        }
	}
};

module.exports = roleMiner;