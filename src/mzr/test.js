let room = HBInit();

room.pluginSpec = {
    name: `mzr/test`,
    author: `mzr`,
    version: `1.0.1`,
     dependencies: [
         `sav/cron`,
         `sav/chat`,
         `sav/players`,
    ],
    // config: {
    //     text: `default message`
    // }
};

// room.on('player-join', function (player) {
//     this.sendChat(player.name + ' joined hahaha')
// });

// room.onPlayerJoin = (player) => room.sendChat("game started NOW");
room.onCron10GameSeconds = () => room.sendChat("10 ingame seconds have passed");

function onPlayerJoin(player) {
    room.setPlayerTeam(player.id, 1);
    room.sendChat(`player moved to red`);
    room.sendAnnouncement(`off we go`, player.id, { prefix: [`CMD`] });
    // room.sendChat(`zonk?`);
}

room.onRoomLink = function onRoomLink() {
    room.onPlayerJoin = onPlayerJoin;
    room.onGameStart = () => room.sendChat(`global zonk?!`);
}