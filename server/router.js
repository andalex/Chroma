const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const chromaPalettes = require('./models/palette.js');

mongoose.Promise = Promise;

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public', 'index.html'));
});

router.get('/chroma', function(req, res) {
  chromaPalettes.find({}, (err, data) => {
      if (err) {
          res.send(err);
      } else {
          res.send(data);
      }
  });
});

module.exports = router;
