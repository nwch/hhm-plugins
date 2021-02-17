let room = HBInit();

room.pluginSpec = {
    name: `mzr/test14`,
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

    if (blues.length >= reds.length) {
        joinRed(player.id);
    } else {        
        joinBlue(player.id);
    }
}

function fixTeams() {
    let teams = getPlayerListByTeam();

    room.sendChat("fix red: " + teams[1].length + " blue: " + teams[2].length + "specs: " + teams[0].length);

    if (teams[1].length > (teams[2].length + 1)) {
        let lastPlayer = teams[1].pop();
        joinBlue(lastPlayer.id);
    } else if (teams[2].length > (teams[1].length + 1)) {
        let lastPlayer = teams[2].pop();
        joinRed(lastPlayer.id);
    }

    if (isGameRunning() && !isEnoughPlayers()) {
        room.stopGame();
    }
}

function isEnoughPlayers() {
    let teams = getPlayerListByTeam();

    room.sendChat("enough red: " + teams[1].length + " blue: " + teams[2].length + "specs: " + teams[0].length);

    return teams[1].length > 0 && teams[2].length > 0;
}

function isGameRunning() {
    return !!room.getScores();
}

function onPlayerJoinHandler(player) {
    //room.sendChat("game started NOW7");
    room.sendAnnouncement("It's a first try to bring longbounce back. New functions will be added step by step.", player.id, 0x83b7b3);
    chooseTeam(player);

    if (!isGameRunning() && isEnoughPlayers()){
        room.startGame();
    }
}

function onGameStopHandler() {
    room.startGame();
}

function onPlayerLeaveHandler() {
    fixTeams();
}

room.onCommand_afk = {
    function: (player) => {
        if (player.team === 0) {
            chooseTeam(player);
        } else {
            room.setPlayerTeam(player.id, 0);
            fixTeams();
        }        
    },
    data: {
        'sav/help': {
            text: ' (move to spectators or back to one of the teams)'
        }
    }
}

room.onRoomLink = function onRoomLink() {
    room.onGameStop = onGameStopHandler;
    room.onPlayerJoin = onPlayerJoinHandler;
    room.onPlayerLeave = onPlayerLeaveHandler;
}