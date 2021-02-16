let room = HBInit();

room.pluginSpec = {
    name: `mzr/test`,
    author: `mzr`,
    version: `1.1.6`,
     dependencies: [
         //`sav/cron`,
         `sav/chat`,
         `sav/players`,
    ],
    // config: {
    //     text: `default message`
    // }
};

function onPlayerJoinHandler(player) {
    room.sendChat("game started NOW!" + player.id);
}

room.onPlayerJoin = onPlayerJoinHandler;
// room.onCron10GameSeconds = () => room.sendChat("10 ingame seconds have passed");

// function onPlayerJoin(player) {
//     room.sendChat(`player moved to red`);
//     room.sendAnnouncement(`off we go`, player.id, { prefix: [`CMD`] });
//     room.setPlayerTeam(player.id, 1);
//     // room.sendChat(`zonk?`);
// }

// room.onPlayerJoin = onPlayerJoin;
// room.onGameStart = () => room.sendChat(`global zonk?!`);



// room.onRoomLink = function onRoomLink() {
//     room.onPlayerJoin = (player) => room.sendChat("game started NOW!!!");
// }