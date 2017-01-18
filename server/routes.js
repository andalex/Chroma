var colors = require('colors');
var express = require('express');
var bodyParser = require('body-parser');
var user = require('./db');
var Sequelize = require('sequelize');

module.exports = function expRouter() {

    var router = express.Router();

    router.use(bodyParser.json());

      router.get('/', (req, res) => {
        user.findAll().then(function(user) {
            res.send(user);
        });
    });


  
    return router;
};