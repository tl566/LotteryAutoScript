const { setVariable } = require("./lib/setVariable");

const { NUMBER, CLEAR, COOKIE, PAT, SCKEY, PUSH_PLUS_TOKEN, LOCALLAUNCH } = process.env;

((async () => {
    if (typeof COOKIE === 'string' && COOKIE.length > 10) {
        if (!LOCALLAUNCH && !PAT) { console.log('请查看README文件, 填入相应的PAT'); return; }
        await setVariable(COOKIE, PAT, SCKEY, PUSH_PLUS_TOKEN);
        const { start, isMe, checkCookie } = require("./lib/lottery-in-nodejs");
        const { clear } = require("./lib/clear");
        const isRight = await checkCookie(NUMBER);
        if (!isRight) return;
        switch (process.argv.slice(2)[0]) {
            case 'start':
                console.log('开始参与抽奖');
                await start();
                break;
            case 'check':
                console.log('检查是否中奖');
                await isMe();
                break;
            case 'clear':
                if (typeof CLEAR === 'string' && CLEAR === 'true') {
                    console.log('开始清理动态');
                    await clear();
                    console.log('清理动态完毕');
                }
                break;
            default:
                break;
        }
    }
}))();
