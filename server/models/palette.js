const mongoose = require('mongoose');
const db = require('./db');

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

