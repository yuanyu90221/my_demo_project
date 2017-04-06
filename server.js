
// main server logic
'use strict'
let express = require('express');
let app = express();
let log4js = require('./modules/log4js/logger');
let {logger} = log4js;
let fileLogger = logger('normal');
let consoleLogger = logger('console');
let bodyParser = require('body-parser');
let path = require('path');
let database = require('./config/database'); 
let mongoose = require('mongoose');
let router = require('./app/router');
mongoose.connect(database.localUrl);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets',express.static(path.join(__dirname, 'assets')));
app.use('/app',express.static(path.join(__dirname, 'app')));
router(app);
app.get('/', (req, res)=>{
   consoleLogger.info("This is an index page! -- log4js");
   fileLogger.info("This is an index page! -- log4js");

   res.sendFile(path.join(__dirname,'index.html'));
});

app.use(log4js.log);

app.listen(process.env.PORT|| 8080);