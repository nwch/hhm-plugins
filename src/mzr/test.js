var room = HBInit();

room.pluginSpec = {
    name: `nwch/test`,
    author: `nwch`,
    version: `1.0.0`,
    dependencies: [
        `sav/cron`
    ],
    config: {
        text: `default message`
    }
};

room.onCron10GameSeconds = () => room.sendChat("10 ingame seconds have passed");