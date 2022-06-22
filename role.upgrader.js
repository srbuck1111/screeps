var roleUpgrader = {
    
    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.isFull = false;
	    }
	    else if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
	        creep.memory.isFull = true;
	    }
        if(creep.memory.isFull == false){
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;