

var roleUpgrader = {



    /** @param {Creep} creep **/

    run: function(creep) {



        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {

            creep.memory.upgrading = false;

            creep.say('🔄 collect from container');

        }

        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {

            creep.memory.upgrading = true;

            creep.say('⚡ upgrade');

        }



        if(creep.memory.upgrading) {

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {

                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});

            }

        }

        else {

         // var containers = creep.room.find(FIND_SOURCES);

          //  if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {

          //      creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});

          //  }
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
                }
            }); 
          
          //  var sources = creep.room.find(FIND_SOURCES);

         /*   if(creep.harvest(containers[0]) == ERR_NOT_IN_RANGE) {

                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});

            }*/
            var source = creep.pos.findClosestByPath(containers);
            if (source) {
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else {
                
                var sources = creep.room.find(FIND_SOURCES);
        
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {

                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }

    }

};

module.exports = roleUpgrader;