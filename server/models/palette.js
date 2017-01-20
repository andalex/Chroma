const mongoose = require('mongoose');
const db = require('./db');
const palettes = require('./palettes.json');

var Schema = mongoose.Schema;
var Palette = new Schema({
    palHash: String,
    palette: [String],
    positions: [String],
    identifierPosition: String,
    fontPalettePositions: [String],
    fontPaletteIdentifierPosition: String,
    currentColor: String,
    fontColor: String,
    currentFontStyles: String,
    fontInitialValue: Number,
    fontStyles: {
      hOne: String,
      hThree: String,
      hTwo: String,
      p: String,
      fontScale: String
    }
  }, {
    collection: 'chromaPalettes'
});

var chromaPalettesData = mongoose.model('chromaPalettes', Palette);
module.exports = chromaPalettesData;


function readInJsonDb(data) {
    var rm = chromaPalettesData.find().remove({});
    rm.exec();
    for (var ii = 0; ii < data.length; ii++) {
        var newEntry = new chromaPalettesData(data[ii]).save();
        if(ii < data.length-1) {
        console.log('uploaded to db')
        }
    }

}
readInJsonDb(palettes);


