const mongoose = require('mongoose');
const db = require('./db');
const palettes = require('./palettes.json');

var Schema = mongoose.Schema;
var palettes = new Schema({
    test: String,
    updated: {
        type: Date,
        default: Date.now
    },
}, {
    collection: 'chromaPalettes'
});

var chromaPalettesData = mongoose.model('chromaPalettes', Music);
module.exports = chromaPalettesData;


// function jsonDb(data) {
//     var rm = chromaPalettesData.find().remove({});
//     rm.exec();
//     for (var ii = 0; ii < data.length; ii++) {
//         var newEntry = new chromaPalettesData(data[ii]).save();
//     }
// }
// jsonDb(sampleMusic);


