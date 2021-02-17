let room = HBInit();

room.pluginSpec = {
    name: `mzr/stats1`,
    author: `mzr`,
    version: `1.0.0`,
     dependencies: [
         //`sav/cron`,
        `sav/core`,
        `sav/chat`,
    ],
    config: {}
};

function onBallKickHandler(player) {
    room.sendAnnouncement("He kicked the ball :o");
    // if (!goalScored) {
    //     pass = player;
    //     checkPass(player);
    //     addPossession(player.id);
    //     updateLastTouch(player);
    //     possBuffer = 0;
    // }
}

room.onRoomLink = function onRoomLink() {
    room.onPlayerBallKick = onBallKickHandler;
    // room.onGameStop = onGameStopHandler;
    // room.onPlayerJoin = onPlayerJoinHandler;
    // room.onPlayerLeave = onPlayerLeaveHandler;
}