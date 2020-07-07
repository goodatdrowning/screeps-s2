var roleRoadRepair = {
    /** @param {Creep} creep **/

    run: function(creep) {

      if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {

            creep.memory.repairing = false;

            creep.say('🔄 harvest');

        }

        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {

            creep.memory.repairing = true;

            creep.say('⚡ uFxRoads ');

        }



        if(creep.memory.repairing) {
              var targets = creep.room.find(FIND_STRUCTURES, { filter: (targets)  => targets.hits < targets.hitsMax});
              let replist = targets.filter(structure => (structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax);
          
                 if(replist.length) {
                        creep.say("Containers");
                        console.log([replist[0]]);
                        if(creep.repair(replist[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(replist[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say(replist[0]);
                                }   
                    }
                else {
                     var targets = creep.room.find(FIND_STRUCTURES, { filter: (targets)  => targets.hits < targets.hitsMax});
                       targets.sort((a,b) => a.hits - b.hits);
                      if(targets.length) {
                         creep.say('Repair' +targets[0]);
                        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say('Rep Other');
                                }   
                    }
                }
                
        }
        else {

            var sources = creep.room.find(FIND_SOURCES);
            var source = creep.pos.findClosestByPath(sources);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {

                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});

            }
        }
    }
    

};

module.exports = roleRoadRepair;