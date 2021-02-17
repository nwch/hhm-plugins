let room = HBInit();

room.pluginSpec = {
    name: `mzr/test8`,
    author: `mzr`,
    version: `1.0.0`,
     dependencies: [
         //`sav/cron`,
        `sav/chat`,
        `sav/players`,
        `sav/commands`,
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

let lastDraw = 1;

function joinRed(playerId) {
    room.setPlayerTeam(playerId, 1);
}

function joinBlue(playerId) {
    room.setPlayerTeam(playerId, 2);
}

function getPlayerListByTeam() {
    const players = room.getPlayerList();
  
    const results = [[], [], []];
  
    players.forEach(p => results[p.team].push(p));

    return results;
}

function chooseTeam(player) {
    let teams = getPlayerListByTeam();

    let reds = teams[1];
    let blues = teams[2];

    if (blues.length > reds.length) {
        joinRed(player.id);
    } else {        
        joinBlue(player.id);
    }
}

function onPlayerJoinHandler(player) {
    room.sendChat("game started NOW7");
    
    chooseTeam(player);
    // if (reds.length === blues.length) {
    //     if (lastDraw === 1) {
    //         joinBlue(player.id);
    //         lastDraw = 2;
    //     } else {
    //         joinRed(player.id);
    //         lastDraw = 1;
    //     }
    // } else if (reds.length > blues.length) {
    //      joinRed(player.id);
    // } else {
    //     joinBlue(player.id);
    // }
}

room.onCommand_afk = {
    function: (player) => {
        if (player.team === 0) {
            chooseTeam(player);
        } else {
            room.setPlayerTeam(player.id, 0);
        }        
    },
    data: {
        'sav/help': {
            text: ' (move to spectators or back to one of the teams)'
        }
    }
}

room.onRoomLink = function onRoomLink() {
    room.onPlayerJoin = onPlayerJoinHandler;
    //room.onGameStart = () => room.sendChat(`global zonk?!`);
}