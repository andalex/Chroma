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
//CRUD
router.post('/api/music', function(req, res, next) {
    chromaPalettes.findOne({
        _id: req.params.id
    }).then(song => {
        if (song) return song;
        return new chromaPalettes({
          song: req.body.song,
          artist: req.body.artist,
          year: req.body.year,
          genre: req.body.genre,
          rating: req.body.rating,
        }).save();
    }).then((err) => {
        if (err) console.log(err);
        res.send('saved')
    }).catch(next);
});

router.get('/api/music', function(req, res) {
  chromaPalettes.find({}, (err, data) => {
      if (err) {
          res.send(err);
      } else {
          res.send(data);
      }
  });
});
router.get('/api/music/:id', (req, res) => {
    chromaPalettes.findById(req.params.id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
router.put('/api/music/:id', (req, res) => {
    chromaPalettes.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        function(err, data) {
            if (err) console.log(err);
        });
    res.end();
});
router.delete('/api/music/:id', function(req, res) {
  chromaPalettes.findOneAndRemove({
      _id: req.params.id
  }, function(err, data) {
      if (err) {
      } else {
        res.send('data deleted' + data);
      }
  });
});

module.exports = router;
