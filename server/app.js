const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const logger        = require('morgan');
const router        = require('./router');
const app           = express();
const public        = path.join( __dirname + '/public');
// const auth 					= require('./user-route');

app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});
app.use('/', router);
// app.use('/auth', auth);
app.use(express.static(public, {redirect : false}));
module.exports = app;
