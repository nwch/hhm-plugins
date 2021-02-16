let room = HBInit();

room.pluginSpec = {
    name: `mzr/test`,
    author: `mzr`,
    version: `1.0.0`,
     dependencies: [
         //`sav/cron`,
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

room.onPlayerJoin = () => room.sendChat("game started NOW");
// room.onCron10GameSeconds = () => room.sendChat("10 ingame seconds have passed");