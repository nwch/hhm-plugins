let room = HBInit();

room.pluginSpec = {
    name: `mzr/test`,
    author: `mzr`,
    version: `1.0.0`,
     dependencies: [
         `sav/cron`,
         `sav/chat`,
    ],
    // config: {
    //     text: `default message`
    // }
};

room.onCron10GameSeconds = () => room.sendChat("10 ingame seconds have passed");