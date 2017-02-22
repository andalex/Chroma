const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const chromaPalettes = require('./models/palette.js');

const genCss = require('./cssgen.js');

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

  router.get('/:id', (req, res) => {

    // let fileType = req.query.scss ? 'palette.scss' : 'palette.css';

    //findById throwing errors so using find one manually here
    chromaPalettes.findOne({ '_id' : req.params.id }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            genCss(data, req.query.scss, () => {
            res.download(`/models/palette.css`, (err) => {
                if (err) console.log(err);
                console.log('download sent')
            });
         }); 
        }
    });
});
});

module.exports = router;
