let room = HBInit();

room.pluginSpec = {
    name: `mzr/stats3`,
    author: `mzr`,
    version: `1.0.0`,
     dependencies: [
         //`sav/cron`,
        `sav/core`,
        `sav/chat`,
    ],
    config: {}
};

let lastTouch = {
    scorer: null,
    assister: null,
};

function updateLastTouch(player) {
    if (lastTouch.scorer !== null) {
      if (player.id !== lastTouch.scorer.id) {
        lastTouch.assister = lastTouch.scorer;
        lastTouch.scorer = player;
      }
    } else {
      lastTouch.scorer = player;
    }
}

function onTeamGoalHandler(teamId) {
    room.sendAnnouncement(addGoal(teamId));
    lastTouch = {
        scorer: null,
        assister: null,
    };
};
  
function addGoal(teamId) {
    if (lastTouch.scorer.team !== teamId) {
      output = output + 'Own goal by: ' + lastTouch.scorer.name;
    } else {
      output = output + 'Goal by: ' + lastTouch.scorer.name;
    }
  
    if (lastTouch.assister !== null) {
      if (lastTouch.assister.team === teamId) {
        output = output + ', Assist by: ' + lastTouch.assister.name;
      }
    }

    return output;
}

function onGameStartHandler() {
    lastTouch = {
        scorer: null,
        assister: null,
    };
}

function onBallKickHandler(player) {
    updateLastTouch(player);
    //room.sendAnnouncement("He kicked the ball :o");
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
    room.onGameStart = onGameStartHandler;
    room.onTeamGoal = onTeamGoalHandler;
    // room.onPlayerJoin = onPlayerJoinHandler;
    // room.onPlayerLeave = onPlayerLeaveHandler;
}