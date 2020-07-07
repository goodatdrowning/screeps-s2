var roleHarvester = require('role.harvester');
var roleBigHarvester = require('role.bigharvester');
var roleUpgrader = require('role.upgrader');
var roleUpgrader2 = require('role.upgrader2');
var roleBuilder = require('role.builder');
var roleRoadRepair = require('role.roadrepair');
var roleRoamUpgrader = require('role.roamupgrader');
var config = require('config');

console.log('Global Reset - Last reset occurred ' + (Game.time - (Memory.lastGlobalReset || Game.time)) + ' ticks ago.');

Memory.lastGlobalReset = Game.time;

module.exports.loop = function () {
    for(var name in Memory.creeps) {

        if(!Game.creeps[name]) {

            delete Memory.creeps[name];

            console.log('Clearing non-existing creep memory:', name);

        }

    }
    
    
    bucketLeft = Game.cpu.bucket;
    if (bucketLeft > 5000) {
        Game.cpu.generatePixel();
    }

    console.log(config.builderParts);
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var bigHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'bigHarvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var roadRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'roadRepairer');
    var roamUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'roamUpgrader');
    console.log('Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' and ' + upgraders2.length + ' Builders: ' + builders.length);
    console.log('RoadRepairers: ' + roadRepairers.length + ' Big Harvesters: ' + bigHarvesters.length);    
   
    for(var name in Game.rooms) {
        console.log('Room '+name+' spawner has '+Game.rooms[name].energyAvailable+' energy');
        var hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS);
    
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${name}`);
            var towers = Game.rooms[name].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }



    if(harvesters.length < 1) {

        var newName = 'Harvester' + Game.time;

        console.log('Spawning new harvester: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,

            {memory: {role: 'harvester'}});

    }
    
    
    if(bigHarvesters.length < 0) {

        var newName = 'bigHarvester' + Game.time;

        console.log('Spawning new harvester: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName,

            {memory: {role: 'bigHarvester'}});

    }
    
    if(builders.length < 2) {

        var newName = 'Builder' + Game.time;

        console.log('Spawning new builder: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,

            {memory: {role: 'builder'}});

    }
    
    

    if(upgraders.length < 2) {

        var newName = 'upgrader' + Game.time;

        console.log('Spawning new upgrader: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,

            {memory: {role: 'upgrader'}});

    }
    
    
    if(upgraders2.length < 1) {

        var newName = 'upgrader' + Game.time;

        console.log('Spawning new upgrader: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,

            {memory: {role: 'upgrader2'}});

    }
    
    
    
    if(roadRepairers.length < 1) {

        var newName = 'Roadrepairer' + Game.time;

        console.log('Spawning new repairer: ' + newName);

        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,

            {memory: {role: 'roadRepairer'}});

    }
        

    if(Game.spawns['Spawn1'].spawning) {

        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];

        Game.spawns['Spawn1'].room.visual.text(

            '🛠️' + spawningCreep.memory.role,

            Game.spawns['Spawn1'].pos.x + 1,

            Game.spawns['Spawn1'].pos.y,

            {align: 'left', opacity: 0.8});

    }

    for(var name in Game.creeps) {

        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {

            roleHarvester.run(creep);

        }
        
        if(creep.memory.role == 'bigHarvester') {

            roleBigHarvester.run(creep);

        }

        if(creep.memory.role == 'upgrader') {

            roleUpgrader.run(creep);

        }
        
        if(creep.memory.role == 'upgrader2') {

            roleUpgrader2.run(creep);

        }
        
        if(creep.memory.role == 'builder') {
            
            roleBuilder.run(creep);
            
        }

        if(creep.memory.role == 'roadRepairer') {
            
            roleRoadRepair.run(creep);
            
        }
    }
}