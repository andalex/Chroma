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

router.get('/chroma', function(req, res, next) {
  chromaPalettes.find({}, (err, data) => {
      if (err) {
          res.send(err);
      } else {
          res.send(data);
      };
      next();
  });

  router.post('/chroma/:id', (req, res) => {
    let scss;
    if(req.query.scss == 'true') {
        scss = true;
    } else {
        scss = false;
    }
    var fileType = scss ? 'palette.scss' : 'palette.css';
    //findById throwing errors so using find one manually here
    chromaPalettes.findById(req.params.id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            genCss(data, scss, () => {
            res.set('Content-Type', 'text/css');
            res.download((__dirname + `/public/${fileType}`), (err) => {
                if (err)  {
                console.log(err);
                return;
            } else {
                console.log('download sent');
            }     
            });
         }); 
        }
    });
});
});

module.exports = router;
