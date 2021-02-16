let room = HBInit();

room.pluginSpec = {
    name: `mzr/test`,
    author: `mzr`,
    version: `2.2.10`,
     dependencies: [
         //`sav/cron`,
         `sav/chat`,
         `sav/players`,
    ],
    config: {}
};

// room.onCron10GameSeconds = () => room.sendChat("10 ingame seconds have passed");

// function onPlayerJoin(player) {
//     room.sendChat(`player moved to red`);
//     room.sendAnnouncement(`off we go`, player.id, { prefix: [`CMD`] });
//     room.setPlayerTeam(player.id, 1);
//     // room.sendChat(`zonk?`);
// }

// room.onPlayerJoin = onPlayerJoin;



function onPlayerJoinHandler(player) {
    room.sendChat("game started NOOOW");
    //room.setPlayerTeam(player.id, 1);
}

room.onRoomLink = function onRoomLink() {
    room.onPlayerJoin = onPlayerJoinHandler;
    //room.onGameStart = () => room.sendChat(`global zonk?!`);
}