let room = HBInit();

room.pluginSpec = {
    name: `mzr/organizeTeams1`,
    author: `mzr`,
    version: `1.0.0`,
     dependencies: [
        // `sav/cron`,
        // `sav/chat`,
        // `sav/players`,
        // `sav/commands`,
    ],
    config: {}
};

haxroomie.log('organize teams plugin loaded...');

room.onPlayerJoin = function() {
    haxroomie.log('someone joined...');
};

// room.onRoomLink = function onRoomLink() {
//     room.onPlayerJoin = onPlayerJoinHandler;
// }