const palettes = require('./palettes.json');
let chromaPalettesData = require('./palette.js');

function readInJsonDb(data) {
    var rm = chromaPalettesData.find().remove({});
    rm.exec();
    for (var ii = 0; ii < data.length; ii++) {
        var newEntry = new chromaPalettesData(data[ii]).save();
        if(ii < data.length-1) {
        }
    }

}
readInJsonDb(palettes);


