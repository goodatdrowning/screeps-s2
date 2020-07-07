// Preset desired number of builders/harvesters/etc
const builders = 2;  
const harvesters = 2;
const upgraders = 2;
const repairers = 2;
const bigHavesters = 2;
var builderParts = "";
// Need to set a priority list for what to build if resources are limited
// Also set priorities for repair/refil?
// Room stage priorities for growth?

//Just testing lol
var me =1;
/* if(me = 1){
    builderParts="WORK, WORK, CARRY, MOVE, MOVE, MOVE";
}
*/

module.exports = { 
    builders: builders,
    harvesters: harvesters,
    upgraders: upgraders,
    repairers: repairers,
    builderParts: builderParts
};
