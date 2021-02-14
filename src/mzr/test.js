var room = HBInit();

room.pluginSpec = {
    name: `nwch/test`,
    author: `mazhor`,
    version: `1.0.0`,
    dependencies: [
        `sav/cron`
    ]
};

room.onCron10GameSeconds = () => room.sendChat("10 ingame seconds have passed");