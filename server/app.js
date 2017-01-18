var express = require('express');
var router  = require('./routes.js');
var app     = express();
var morgan  = require('morgan');

app.use(morgan('dev'));

app.use(router());

module.exports = app;
