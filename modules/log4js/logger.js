// Set Logger
let log4js = require('log4js');
log4js.configure({
    appenders:[
        {
            type: 'console',
            category: 'console'
        }, // console show
        {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize:  1024, // 
            backups: 10,
            category: 'normal'
        }
    ],
    replaceConsole: true
})

let logger = log4js.getLogger('normal');
logger.setLevel('INFO');

let log = log4js.connectLogger(logger, {level: 'auto', format:':method :url'});
module.exports = {
    log: log,
    logger: (name)=>{
        let logger = log4js.getLogger(name);
        logger.setLevel('INFO');
        return logger;
    }
}